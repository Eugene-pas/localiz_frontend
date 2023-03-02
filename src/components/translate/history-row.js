import { useState } from "react";
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
import { translate } from "../../services/translateHistory";
import moment from 'moment';

export const HistoryRow = ({update, history, ...rest }) => {
    const [open, setOpen] = useState(false);
    const [translateData, setTranslate] = useState("");

    const hendleTranslate = (event) => {
        console.log(translate);
        setTranslate(event.target.value);
    }

    const hendleSave = async () => {

        await translate({
            id: history.id,
            documentId: history.documentId,
            translateText: translateData,
            version: ""
        })
        update();
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
                            color="textPrimary"
                            variant="body1"
                        >
                            {history.text}
                        </Typography>
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
                            defaultValue={history.translateText}
                            rows={2}
                            onChange={hendleTranslate}
                            variant="standard"
                            sx={{
                                width: "100%" 
                            }}
                        />
                        <Tooltip title={"Save"}>
                        <IconButton onClick={hendleSave}>
                            <SaveAltIcon />
                        </IconButton>
                        </Tooltip>
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
