import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  IconButton,
  Typography,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import { ContentRow } from './content-row';
import { getContentRange } from '../../services/translateContent';
import { useSelector } from 'react-redux';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box } from '@mui/system';

const dataContent = {
  pageNumber: 0,
  totalPages: 0,
  totalItems: 0,
  hasPreviousPage: true,
  hasNextPage: true,
  items: [
    {
      id: 1,
      text: "",
      translateText: "",
      date: "2023-03-02T08:08:39.558Z",
      version: "",
      number: 1,
      documentId: 0,
      userInfo: {
        name: "string",
        surname: "string",
        email: "string"
      }
    }
  ]
}

export const ContentListResults = ({ ...rest }) => {
  const documentId = useSelector(state => state.contentReducer.documentId);
  const isContentUpdate =  useSelector(state => state.contentReducer.isUpdate);
  const [isUpdate, setIsUpdate] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [content, setContent] = useState(dataContent)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContentRange({
        documentId: documentId,
        pageNumber: page,
        pageSize: pageSize
      });
      setContent(data);
    }

    fetchData();
  }, [page, pageSize, isUpdate, isContentUpdate])

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleKeyPressNextPage = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'Enter') {
      setPage(page + 1);
    }
  }

  const handleKeyPressPreviousPage = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'Enter') {
      setPage(page - 1);
    }
  }

  const handleSelect = (event) => {
    setPage(1);
    setPageSize(event.target.value)
  }

  const update = () => {
    setIsUpdate(!isUpdate);
  }

  return (
    <Card {...rest}>
      <TableContainer >
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                #
              </TableCell>
              <TableCell>
                Default
              </TableCell>
              <TableCell>
                Translate
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content !== undefined && content.items !== undefined ?
              content.items.map((item) => (
                <ContentRow key={item.id} content={item} update={update} />
              )) :
              <TableRow>
                <TableCell height={"100vh"} colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
      {content !== undefined && content.items !== undefined ?
          <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
            justifyContent: "right",
            padding: 1,
          }}>
            <Typography
              color="textPrimary"
              variant="body1"
              fontSize={14}
            >
              Rows per page:
            </Typography>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 50, scale: "90%" }}>
              <Select
                id="demo-simple-select-standard"
                value={pageSize}
                onChange={handleSelect}

              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
            <Typography
              color="textPrimary"
              variant="body1"
              fontSize={14}
            >
              {`${page}-${content.totalPages} of ${content.totalItems}`}
            </Typography>
            <IconButton
              disabled={!content.hasPreviousPage}
              onClick={handlePreviousPage}
              onKeyUp={handleKeyPressPreviousPage}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton
              disabled={!content.hasNextPage}
              onClick={handleNextPage}
              onKeyUp={handleKeyPressNextPage}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        : <></>}
    </Card>
  );
};
