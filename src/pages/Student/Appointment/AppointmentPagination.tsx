import React from 'react'
import Container from '../../../components/Container';
import * as Styled from './AppointmentPagination.styled'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination:
  React.FC<{
    currentPage: number,
    totalPages: number,
    paginate: any
  }> = (props) => {

    const pageNumber = [];
    if (props.currentPage === 1) {
      pageNumber.push(props.currentPage);
      if (props.totalPages >= props.currentPage + 1) {
        pageNumber.push(props.currentPage + 1);
      }
      if (props.totalPages >= props.currentPage + 2) {
        pageNumber.push(props.currentPage + 2);
      }
    } else if (props.currentPage > 1) {
      if (props.currentPage >= 3) {
        pageNumber.push(props.currentPage - 2);
        pageNumber.push(props.currentPage - 1);
      } else {
        pageNumber.push(props.currentPage - 1);
      }

      pageNumber.push(props.currentPage);

      if (props.totalPages >= props.currentPage + 1) {
        pageNumber.push(props.currentPage + 1);
      }
      if (props.totalPages >= props.currentPage + 2) {
        pageNumber.push(props.currentPage + 2);
      }
    }
    return (
      <Container>
        <Styled.NavWrapper>
          <Styled.PageItem onClick={() => props.paginate(props.currentPage > 1 ? props.currentPage - 1 : 1)}>
            <Styled.ButtonItem>
              <MdKeyboardArrowLeft />
            </Styled.ButtonItem>
          </Styled.PageItem>
          {pageNumber.map(number => (
            <Styled.PageItem key={number} onClick={() => props.paginate(number)}>
              <Styled.ButtonItem className={props.currentPage === number ? 'active' : ''}>{number}</Styled.ButtonItem>
            </Styled.PageItem>
          ))}
          <Styled.PageItem onClick={() => props.paginate(props.currentPage < props.totalPages ? props.currentPage + 1 : props.totalPages)}>
            <Styled.ButtonItem>
              <MdKeyboardArrowRight />
            </Styled.ButtonItem>
          </Styled.PageItem>
        </Styled.NavWrapper>
      </Container>

    )
  }

export default Pagination