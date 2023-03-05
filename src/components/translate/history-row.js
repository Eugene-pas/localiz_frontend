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
    Tooltip,
    Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { translate } from "../../services/translateHistory";
import TranslatePopover from "./translate-popover"
import { translateAPI } from "../../api/configurations/translateAPIConf";
import { useSelector } from "react-redux";
import moment from 'moment';

export const HistoryRow = ({ update, history, ...rest }) => {
    const documentId = useSelector(state => 
        state.historyReducer.documentId);
    const project = useSelector(state => 
        state.projectReducer.projects.find(item => item.id === documentId));

    const settingsRef = useRef(null);
    const [openAccountPopover, setOpenAccountPopover] = useState(false);
    const [open, setOpen] = useState(false);
    const [isCanSave, setIsCanSave] = useState(true);
    const [hint, setHint] = useState("I don't know how translate this text.");
    const [defaultValue, setDefaultValue] = useState(history.translateText);
    const [translateData, setTranslate] = useState(
        (history.translateText ? history.translateText : ""));

    const hendleTranslate = (event) => {
        setTranslate(event.target.value);
    }

    useEffect(() => {
        if (translateData === (history.translateText ? history.translateText : ""))
            setIsCanSave(true);
        else
            setIsCanSave(false);
    }, [translateData])

    const hendleSave = async () => {

        await translate({
            id: history.id,
            documentId: history.documentId,
            translateText: translateData,
            version: ""
        })
        update();
        setIsCanSave(true);
    }

    const hendelSuggest = async () => {
        const resp = await translateAPI(
            project.fromTranslate.toLowerCase(), 
            project.toTranslate.toLowerCase(), 
            history.text
            );
        console.log(resp.responseData.translatedText);
        if(resp.responseData.translatedText)
            setHint(resp.responseData.translatedText);

        setOpenAccountPopover(true)
    }

    const suggest = () => {
        setTranslate(hint);
        setDefaultValue(hint);
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
                            {history.number}
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
                            sx={{cursor: "pointer"}}
                            ref={settingsRef} 
                            onClick={hendelSuggest}
                                color="textPrimary"
                                variant="body1"
                            >
                                {history.text}
                            </Typography>
                        
                        <TranslatePopover
                            suggest={suggest}
                            historyText={hint}
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
                            defaultValue={defaultValue}
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
                                            {moment.utc(history.date).format("DD.MM.yy")}
                                        </TableCell>
                                        <TableCell>
                                            {history.userInfo ?
                                                `${history.userInfo.name} ${history.userInfo.surname}`
                                                : "not translate"
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                history.userInfo ?
                                                    history.userInfo.email
                                                    : "not translate"
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                history.version ?
                                                    history.version
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
