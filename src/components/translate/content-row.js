import { useState, useEffect, useRef } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Collapse,
    TextField,
    Tooltip
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { translate } from "../../services/translateContent";
import { getHistoryRange } from "../../services/history";
import TranslatePopover from "./translate-popover"
import { translateAPI } from "../../api/configurations/translateAPIConf";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const removeRequiredChar = (data) => {
    if (data === "" || data === null)
        return data;

    if (data.at(-1) === '"' && data.at(0) === '"') {
        return data.slice(1, data.length - 1);
    } else if (data.at(-1) === ',' && data.at(0) === '"') {
        return data.slice(1, data.length - 2);
    } else if (data.at(-1) === '\r' && data.at(0) === '"') {
        return data.slice(1, data.length - 2);
    }

    return data;
}

export const ContentRow = ({ update, content, ...rest }) => {
    const projectId = useSelector(state =>
        state.documentReducer.projectId);
    const project = useSelector(state =>
        state.projectReducer.projects.find(item => item.id === projectId));

    const settingsRef = useRef(null);
    const [openAccountPopover, setOpenAccountPopover] = useState(false);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const [isCanSave, setIsCanSave] = useState(true);
    const [hint, setHint] = useState(t("contentRow.notTranslate"));
    const [contentText, setContentText] = useState("");
    const [defaultValue, setDefaultValue] = useState(content.translateText);
    const [history, setHistory] = useState([{
        translateText: content.translateText,
        date: content.date,
        version: content.version,
        userInfo: {
            name: (content.userInfo ? content.userInfo.name : null),
            surname: (content.userInfo ? content.userInfo.surname : null),
            email: (content.userInfo ? content.userInfo.email : null)
        }
    }]);
    const [translateData, setTranslate] = useState(
        (content.translateText ? removeRequiredChar(content.translateText) : ""));

    const hendleTranslate = (event) => {
        setTranslate(event.target.value);
        if(event.target.value === "")
        setIsCanSave(true);
    }

    useEffect(() => {
        setContentText(removeRequiredChar(content.text));

        if (addRequiredChar(translateData) === (content.translateText ? content.translateText : ""))
            setIsCanSave(true);
        else
            setIsCanSave(false);
    }, [translateData])

    const hendleSave = async () => {

        await translate({
            id: content.id,
            documentId: content.documentId,
            translateText: addRequiredChar(translateData),
            version: ""
        })
        update();
        setIsCanSave(true);
    }

    const hendelSuggest = async () => {
        const resp = await translateAPI(
            project.fromTranslate.toLowerCase(),
            project.toTranslate.toLowerCase(),
            contentText
        );
        console.log(resp.responseData.translatedText);
        if (resp.responseData.translatedText)
            setHint(resp.responseData.translatedText);

        setOpenAccountPopover(true)
    }

    const suggest = () => {
        setTranslate(hint);
        setDefaultValue(hint);
    }

    const addRequiredChar = (data) => {
        if (data === "")
            return data;

        if (content.text.at(-1) === '"') {
            const textT = data.split('');
            textT.push('"');
            textT.unshift('"');
            return textT.join("");
        }
        else if (content.text.at(-1) === ',') {
            const textT = data.split('');
            textT.push('",');
            textT.unshift('"');
            return textT.join("");
        }
        else if (content.text.at(-1) === '\r') {
            const textT = data.split('');
            textT.push('"\r');
            textT.unshift('"');
            return textT.join("");
        }

        return data;
    }

    const hendelHistory = async () => {
        const histories = await getHistoryRange({
            contentId: content.id,
            pageSize: 1000,
            pageNumber: 1
        });
        setHistory(histories.items)
        setOpen(!open);
    }

    return (
        <>
            <TableRow
                {...rest}
                hover
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={hendelHistory}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Typography
                            color="textPrimary"
                            variant="body1"
                        >
                            {content.number}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell width={"45%"}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            minWidth: '220px'
                        }}
                    >


                        <Typography
                            sx={{ cursor: "pointer" }}
                            ref={settingsRef}
                            onClick={hendelSuggest}
                            color="textPrimary"
                            variant="body1"
                        >
                            {contentText}
                        </Typography>

                        <TranslatePopover
                            suggest={suggest}
                            contentText={hint}
                            anchorEl={settingsRef.current}
                            open={openAccountPopover}
                            onClose={() => setOpenAccountPopover(false)}
                        />
                    </Box>
                </TableCell>
                <TableCell>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            minWidth: '220px',
                        }}
                    >
                        <TextField
                            id="standard-multiline-static"
                            multiline
                            defaultValue={removeRequiredChar(defaultValue)}
                            rows={2}
                            onChange={hendleTranslate}
                            variant="standard"
                            sx={{
                                width: "100%"
                            }}
                        />

                        <IconButton
                            onClick={hendleSave}
                            disabled={isCanSave}
                        >
                            <Tooltip title={"Save"}>
                                <DriveFileRenameOutlineIcon />
                            </Tooltip>
                        </IconButton>

                    </Box>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                {t("contentRow.detailedInfo")}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t("contentRow.transleteText")}</TableCell>
                                        <TableCell>{t("date")}</TableCell>
                                        <TableCell>{t("interpreter")}</TableCell>
                                        <TableCell align="right">{t("email")}</TableCell>
                                        <TableCell align="right">{t("version")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history ? history.sort((b, a) => new Date(a.date) - new Date(b.date)).map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {item.translateText}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {moment.utc(item.date).format("HH:mm DD.MM.yy")}
                                            </TableCell>
                                            <TableCell>
                                                {item.userInfo ?
                                                    `${item.userInfo.name} ${item.userInfo.surname}`
                                                    : "not translate"
                                                }
                                            </TableCell>
                                            <TableCell align="right">
                                                {
                                                    item.userInfo ?
                                                        item.userInfo.email
                                                        : "not translate"
                                                }
                                            </TableCell>
                                            <TableCell align="right">
                                                {
                                                    item.version ?
                                                        content.version
                                                        : "not translate"
                                                }
                                            </TableCell>
                                        </TableRow>))
                                        :
                                        <TableRow >
                                            {Array(5).fill().map((_,index) => ( 
                                            <TableCell key={index}>
                                                <Skeleton />
                                            </TableCell>))}
                                        </TableRow>}

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
