import { useState } from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  TableContainer
} from '@mui/material';
import { TRANSLATE } from '../../navigation/CONSTANTS';
import { Delete as IconDelete } from '@mui/icons-material';
import { deleteDocument } from '../../services/document'
import { setDocumentData } from '../../redux/setStore';
import { setContent } from '../../redux/actions/content';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const DocumentListResults = ({ documents, ...rest }) => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [onDelete, setOnDelete] = useState(false);
  const navigate = useNavigate()

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (documentId) => { 
      setOnDelete(true);
      await deleteDocument(documentId);
      await setDocumentData()
  }

  const onRowClick = (doc) => {
    dispatch(setContent(
      {
        documentId: doc.id, 
        documentName: doc.name
      }));
    navigate(TRANSLATE);
  }

  return (
    <Card {...rest}>
      <TableContainer >
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Creation Date
              </TableCell>
              <TableCell>
                Description
              </TableCell>
              <TableCell>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents !== null && documents.length !== 0 ?
              documents.slice(page * limit, page * limit + limit).map((document) => (
                <TableRow
                  hover
                  key={document.id}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell
                  onClick={() => onRowClick({id: document.id, name: document.name})}
                  >
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
                        {document.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                  onClick={() => onRowClick({id: document.id, name: document.name})}
                  >
                    {moment.utc(document.creationDate).format('DD/MM/yyyy')}
                  </TableCell>
                  <TableCell
                  onClick={() => onRowClick({id: document.id, name: document.name})}
                  >
                    {document.description}
                  </TableCell>
                  <TableCell>
                    <IconButton disabled={onDelete} onClick={() => {handleDelete(document.id)}}>
                      <IconDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) :
              <TableRow>
                <TableCell height={"100vh"} colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
      {documents !== null && documents.length !== 0 ?
        <TablePagination
          component="div"
          count={documents.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        /> : <></>}
    </Card>
  );
};
