import React, { useState } from 'react';
import { Col, List, Row } from 'antd';
import * as Styled from './Tutors.styled';
import Container from '../Container';
import { Tutor } from './Tutor.type';
import TutorItem from './TutorItem/TutorItem'

const TutorsList: React.FC<{ list: Tutor[], initLoading: boolean }> = (props) => {
  const [hoveredTutor, setHoveredTutor] = useState<Tutor>();
  const [translateY, setTranslateY] = useState<number>(0);

  const getEmbedUrl = (url: string): string => {
    const videoIdMatch = url.match(/v=([^&]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  const handleMouseEnter = (event: { currentTarget: any; }, item: Tutor) => {
    const tutorItem = event.currentTarget;
    const itemRect = tutorItem.getBoundingClientRect();
    const containerRect = tutorItem.parentElement.getBoundingClientRect();
    const newTranslateY = itemRect.top - containerRect.top;
    setHoveredTutor(item);
    setTranslateY(newTranslateY);
  };

  return (
    <>
      <Styled.TutorFilteredSection>
        <Container>
          <Styled.TutorFiltered>
            <Row justify='space-between'>
              <Col lg={17} md={24} xs={24} sm={24}>
                <List
                  loading={props.initLoading}
                  itemLayout="horizontal"
                  dataSource={props.list}
                  renderItem={(item) => (
                    <Styled.TutorItem
                      onMouseEnter={(event) => handleMouseEnter(event, item)}
                      translate={typeof translateY === 'number' ? "no" : translateY}>
                      <TutorItem item={item} />
                    </Styled.TutorItem>
                  )}
                />
              </Col>
              <Col lg={6} md={0} sm={0} xs={0} >
                <Styled.TurtorVideo translate={typeof translateY === 'number' ? translateY : 0}>
                  {hoveredTutor && hoveredTutor.videoIntroductionLink && (
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ 'borderRadius': '12px' }}
                      src={getEmbedUrl(hoveredTutor.videoIntroductionLink)}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </Styled.TurtorVideo>
              </Col>
            </Row>

          </Styled.TutorFiltered>
        </Container>
      </Styled.TutorFilteredSection>
    </>

  );
}

export default TutorsList;