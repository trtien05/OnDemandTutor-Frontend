import React, { useEffect, useState } from 'react';
import { Select, Row, Col, Slider } from 'antd';
import * as Styled from './SearchTutors.styled';
import Container from '../../components/Container';
import TutorsList from '../../components/TutorsList/TutorsList'
import { useDocumentTitle } from '../../hooks';
import { Tutor } from '../../components/TutorsList/Tutor.type';
const { Option } = Select;


const fakeDataUrl = `http://localhost:8080/api/tutors?pageNo=0&pageSize=6`;

const SearchTutors = () => {
  useDocumentTitle("Search Tutors | MyTutor")

  const [specialty, setSpecialty] = useState<string>('Specialties');
  const [availableTime, setAvailableTime] = useState<string>('Available Time');
  const [tutorLevel, setTutorLevel] = useState<string>('Tutor Level');
  const [sortBy, setSortBy] = useState<string>('Sort By');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([100000, 500000]);
  const [minPrice, setMinPrice] = useState<number>(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState<number>(priceRange[1]);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<Tutor[]>([]);
  const [data, setData] = useState<Tutor[]>([]);

  const handleSave = () => {
    let isSearchCriteriaSelected = false;

    if (
      specialty !== 'Specialties' ||
      availableTime !== 'Available Time' ||
      tutorLevel !== 'Tutor Level' ||
      sortBy !== 'Sort By' ||
      searchKeyword !== ''
    ) {
      isSearchCriteriaSelected = true;
    }

    if (!isSearchCriteriaSelected && (priceRange[0] !== 10000 || priceRange[1] !== 50000)) {
      isSearchCriteriaSelected = true;
    }

    if (!isSearchCriteriaSelected) {
      alert('Please fill in at least one search field.');
      return;
    }

    const searchCriteria = {
      specialty,
      priceRange: `${priceRange[0]}-${priceRange[1]}`,
      availableTime,
      tutorLevel,
      sortBy,
      searchKeyword,
    };
    console.log(searchCriteria)
  };

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.content);
        setList(res.content);
      });
  }, []);

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

              <Col lg={8}>
                <Styled.StyledSelect placeholder="Available Time" onChange={setAvailableTime}>
                  <Option value="Available Time">Available Time</Option>
                  <Option value="Morning">Morning</Option>
                  <Option value="Afternoon">Afternoon</Option>
                  <Option value="Evening">Evening</Option>
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
                  <Option value="Rating">Rating</Option>
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
            [Number] tutors available
          </Styled.TotalTutorAvaiable>
        </Container>
      </Styled.TitleWrapper>


      <TutorsList initLoading={initLoading} list={list} />

    </>


  );
};

export default SearchTutors;
