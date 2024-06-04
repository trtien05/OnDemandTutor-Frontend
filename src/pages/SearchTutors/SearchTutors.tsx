import React, { useEffect, useState } from 'react';
import { Select, Row, Col, Slider } from 'antd';
import * as Styled from './SearchTutors.styled';
import Container from '../../components/Container';
import TutorsList from '../../components/TutorsList/TutorsList'
import { useDocumentTitle } from '../../hooks';
import { Tutor } from '../../components/TutorsList/Tutor.type';
import Pagination from '../../components/Pagination/Pagination';
const { Option } = Select;


const SearchTutors = () => {
  useDocumentTitle("Search Tutors | MyTutor")

  const [specialty, setSpecialty] = useState<string>('');
  const [availableTime, setAvailableTime] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');
  const [tutorLevel, setTutorLevel] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([100000, 500000]);
  const [minPrice, setMinPrice] = useState<number>(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState<number>(priceRange[1]);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<Tutor[]>([]);
  const [data, setData] = useState<Tutor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorPerPage] = useState(4);
  const [totalAmountofTutors, setTotalAmountTutors] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [searchUrl, setSearchUrl] = useState('');

  const handleSave = () => {
    const searchCriteria = {
      specialty,
      priceRange: `${priceRange[0]}-${priceRange[1]}`,
      availableTime,
      tutorLevel,
      sortBy,
      searchKeyword,
    };
    let url = ``;

    if (specialty !== 'Specialties') {
      url += `&specialty=${specialty}`;
    }
    if (availableTime !== 'Available Time') {
      url += `&availableTime=${availableTime}`;
    }
    if (tutorLevel !== 'Tutor Level') {
      url += `&tutorLevel=${tutorLevel}`;
    }
    if (sortBy !== 'Sort By') {
      url += `&sortBy=${sortBy}`;
    }
    if (searchKeyword !== '') {
      url += `&searchKeyword=${searchKeyword}`;
    }
    if (priceRange[0] !== 100000 || priceRange[1] !== 500000) {
      url += `&priceMin=${priceRange[0]}&priceMax=${priceRange[1]}`;
    }

    setSearchUrl(url);

    console.log(searchCriteria)
    console.log(searchUrl);
  };


  useEffect(() => {
    const baseUrl: string = `http://localhost:8080/api/tutors?pageNo=${currentPage - 1}&pageSize=${tutorPerPage}`;

    let url: string = '';

    if (searchUrl === '') {
      url = baseUrl;
    } else {
      url = baseUrl + searchUrl
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.content);
        setList(res.content);
        setTotalAmountTutors(res.totalElements);
        setTotalPages(res.totalPages);
      });
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);
  console.log(currentPage)


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const onChangeComplete = (value: number | number[]) => {
    console.log('onChangeComplete: ', value);
    setPriceRange(value as [number, number]);
    console.log(priceRange);

  };

  const priceDropdownRender = () => (
    <div style={{ padding: 8 }}>
      <Slider
        range
        step={10000}
        min={minPrice}
        max={maxPrice}
        onAfterChange={onChangeComplete}
      />
      <p>Selected price range: {priceRange[0]} - {priceRange[1]}</p>
    </div>
  );

  return (
    <>
      <Styled.FilterSection>
        <Container>
          <Styled.SearchWrapper>
            <Row justify='space-between' align='middle' gutter={[20, 20]}>
              <Col lg={4}>
                <Styled.StyledSelect placeholder="Specialties" onChange={setSpecialty}>
                  <Option value="Ielts">Ielts</Option>
                  <Option value="Toeic">Toeic</Option>
                  <Option value="Cambridge">Cambridge</Option>
                </Styled.StyledSelect>
              </Col>

              <Col lg={8}>
                <Styled.StyledSelect
                  dropdownRender={priceDropdownRender}
                  value={`Price range: ${priceRange[0]}đ - ${priceRange[1]}đ`} >
                </Styled.StyledSelect>
              </Col>

              <Col lg={4}>
                <Styled.StyledSelect mode='multiple' placeholder="Available Time" onChange={setAvailableTime}>
                  <Option value="Morning">Morning</Option>
                  <Option value="Afternoon">Afternoon</Option>
                  <Option value="Evening">Evening</Option>
                </Styled.StyledSelect>
              </Col>
              <Col lg={4}>
                <Styled.StyledSelect mode='multiple' placeholder="Days of week" onChange={setDateTime}>
                  <Option value="Mon">Monday</Option>
                  <Option value="Tue">Tuesday</Option>
                  <Option value="Wed">Wednesday</Option>
                  <Option value="Thur">Thursday</Option>
                  <Option value="Fri">Friday</Option>
                  <Option value="Sat">Saturday</Option>
                  <Option value="Sun">Sunday</Option>
                </Styled.StyledSelect>
              </Col>

              <Col lg={4}>
                <Styled.StyledSelect placeholder="Tutor Level" onChange={setTutorLevel}>
                  <Option value="Associate">Associate</Option>
                  <Option value="Bachelor">Bachelor</Option>
                  <Option value="Master">Master</Option>
                  <Option value="Doctoral">Doctoral</Option>
                </Styled.StyledSelect>
              </Col>
            </Row>

            <Styled.RowWrapper justify='center' align='middle' gutter={[20, 20]}>
              <Col lg={4}>
                <Styled.StyledSelect placeholder="Sort By" onChange={setSortBy}>
                  <Option value="Price">Price</Option>
                </Styled.StyledSelect>
              </Col>

              <Col lg={8}>
                <Styled.InputStyled
                  placeholder="Search by name or keyword"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </Col>

              <Col lg={2}>
                <Styled.ButtonStyled type="primary" onClick={handleSave}>Save</Styled.ButtonStyled>
              </Col>
            </Styled.RowWrapper>
          </Styled.SearchWrapper>
        </Container>
      </Styled.FilterSection>

      <Styled.TitleWrapper>
        <Container>
          <Styled.TotalTutorAvaiable level={1}>
            {totalAmountofTutors} tutors available
          </Styled.TotalTutorAvaiable>
        </Container>
      </Styled.TitleWrapper>
      <TutorsList initLoading={initLoading} list={list} />
      {totalPages > 1 &&
        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      }
    </>


  );
};

export default SearchTutors;
