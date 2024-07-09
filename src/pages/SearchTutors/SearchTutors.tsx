import { useEffect, useState } from 'react';
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
  const [tutorLevel, setTutorLevel] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([100000, 1000000]);
  const [minPrice, setMinPrice] = useState<number>(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState<number>(priceRange[1]);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<Tutor[]>([]);
  const [data, setData] = useState<Tutor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorPerPage] = useState(4);
  const [totalAmountofTutors, setTotalAmountTutors] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
  }, [])

  const [searchUrl, setSearchUrl] = useState('');

  const handleSpecialtyChange = (value: unknown) => {
    setSpecialty(value as string);
    console.log(specialty);
  };
  const handleTutorLevelChange = (value: unknown) => {
    setTutorLevel(value as string);
    console.log(tutorLevel);
  };
  const handleSortChange = (value: unknown) => {
    setSortBy(value as string);
    console.log(sortBy);
  };
  const handleSave = () => {
    let url = ``;

    if (specialty !== 'Specialties') {
      url += `&specialty=${specialty}`;
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

  };


  useEffect(() => {
    // const baseUrl: string = `https://my-tutor-render.onrender.com/api/tutors?pageNo=${currentPage - 1}&pageSize=${tutorPerPage}`;
    const baseUrl: string = `https://my-tutor-render.onrender.com/api/tutors?pageNo=${currentPage - 1}&pageSize=${tutorPerPage}`;

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, searchUrl]);


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const onChangeComplete = (value: number | number[]) => {
    setPriceRange(value as [number, number]);
  };

  console.log(data);
  const priceDropdownRender = () => (
    <div style={{ padding: 8 }}>
      <Slider
        range
        step={10000}
        min={minPrice}
        max={maxPrice}
        onAfterChange={onChangeComplete}
      />
      <p>Selected price range: {priceRange[0].toLocaleString() + 'đ'} - {priceRange[1].toLocaleString() + 'đ'}</p>
    </div>
  );
  const options = [
    { label: 'Specialties', value: 'Specialties' },
    { label: 'Mathematics', value: 'Mathematics' },
    { label: 'Chemistry', value: 'Chemistry' },
    { label: 'Biology', value: 'Biology' },
    { label: 'Literature', value: 'Literature' },
    { label: 'English', value: 'English' },
    { label: 'IELTS', value: 'IELTS' },
    { label: 'TOEFL', value: 'TOEFL' },
    { label: 'TOEIC', value: 'TOEIC' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Geography', value: 'Geography' },
    { label: 'History', value: 'History' },
    { label: 'Coding', value: 'Coding' },
  ];
  return (
    <>
      <Styled.FilterSection>
        <Container>
          <Styled.SearchWrapper>
            <Row justify='center' align='middle' gutter={[20, 20]}>
              <Col xl={8} lg={8} xs={24}>
                <Styled.StyledSelect placeholder="Specialties" onChange={handleSpecialtyChange}>
                  {options.map((option, index) => (
                    <Option key={index} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Styled.StyledSelect>
              </Col>

              <Col xl={8} lg={8} xs={24}>
                <Styled.StyledSelect
                  dropdownRender={priceDropdownRender}
                  value={`Price range: ${priceRange[0].toLocaleString() + 'đ'} - ${priceRange[1].toLocaleString() + 'đ'}`} >
                </Styled.StyledSelect>
              </Col>

              <Col xl={8} lg={8} xs={24}>
                <Styled.StyledSelect placeholder="Tutor Level" onChange={handleTutorLevelChange}>
                  <Option value="Tutor Level">Tutor Level</Option>
                  <Option value="Associate">Associate</Option>
                  <Option value="Bachelor">Bachelor</Option>
                  <Option value="Master">Master</Option>
                  <Option value="Doctoral">Doctoral</Option>
                </Styled.StyledSelect>
              </Col>
            </Row>

            <Styled.RowWrapper justify='center' align='middle' gutter={[20, 20]}>
              <Col xl={4} lg={4} xs={24}>
                <Styled.StyledSelect placeholder="Sort By" onChange={handleSortChange}>
                  <Option value="Sort By">Sort By</Option>
                  <Option value="Rating">Rating</Option>
                  <Option value="Price">Price</Option>
                </Styled.StyledSelect>
              </Col>

              <Col xl={8} lg={8} xs={24}>
                <Styled.InputStyled
                  placeholder="Search by name or keyword"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </Col>

              <Col xl={2} lg={2} xs={24}>
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
