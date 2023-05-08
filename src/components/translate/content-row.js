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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { translate } from "../../services/translateContent";
import TranslatePopover from "./translate-popover"
import { translateAPI } from "../../api/configurations/translateAPIConf";
import { useSelector } from "react-redux";
import moment from 'moment';

export const ContentRow = ({ update, content, ...rest }) => {
    const projectId = useSelector(state =>
        state.documentReducer.projectId);
    const project = useSelector(state =>
        state.projectReducer.projects.find(item => item.id === projectId));

    const settingsRef = useRef(null);
    const [openAccountPopover, setOpenAccountPopover] = useState(false);
    const [open, setOpen] = useState(false);
    const [isCanSave, setIsCanSave] = useState(true);
    const [hint, setHint] = useState("I don't know how translate this text.");
    const [contentText, setContentText] = useState("");
    const [defaultValue, setDefaultValue] = useState(content.translateText);
    const [translateData, setTranslate] = useState(
        (content.translateText ? content.translateText : ""));

    const hendleTranslate = (event) => {
        setTranslate(event.target.value);
    }

    useEffect(() => {
        setContentText(removeRequiredChar(content.text));
        
        if (translateData === (content.translateText ? content.translateText : ""))
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

    const removeRequiredChar = (data) => {
        if(data === "" || data === null)
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
                        onClick={() => setOpen(!open)}
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
                                <SaveAltIcon />
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
                                Detailed information
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Interpreter</TableCell>
                                        <TableCell align="right">Email</TableCell>
                                        <TableCell align="right">Version</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {moment.utc(content.date).format("DD.MM.yy")}
                                        </TableCell>
                                        <TableCell>
                                            {content.userInfo ?
                                                `${content.userInfo.name} ${content.userInfo.surname}`
                                                : "not translate"
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                content.userInfo ?
                                                    content.userInfo.email
                                                    : "not translate"
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                content.version ?
                                                    content.version
                                                    : "not translate"
                                            }
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
