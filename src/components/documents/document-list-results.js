import { useState } from 'react';
import {
  Box,
  Card,
  Checkbox,
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
import { Delete as IconDelete } from '@mui/icons-material';
import { deleteDocument } from '../../services/document'
import { setDocumentData } from '../../redux/setStore';
import moment from 'moment';

export const DocumentListResults = ({ documents, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = documents.map((document) => document.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (documentId) => { 
      await deleteDocument(documentId);
      await setDocumentData()
  }

  return (
    <Card {...rest}>
      <TableContainer >
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                {documents !== null && documents.length !== 0 ?
                  <Checkbox
                    checked={selectedCustomerIds.length === documents.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < documents.length
                    }
                    onChange={handleSelectAll}
                  /> : <></>}
              </TableCell>
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
              documents.slice(0, limit).map((document) => (
                <TableRow
                  hover
                  key={document.id}
                  selected={selectedCustomerIds.indexOf(document.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(document.id) !== -1}
                      onChange={(event) => handleSelectOne(event, document.id)}
                      value="true"
                    />
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
                        {document.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {moment.utc(document.creationDate).format('DD/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    {document.description}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => {handleDelete(document.id)}}>
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
