import moment from 'moment';
import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { Flip } from 'react-reveal';
const PrayerCards = ({ prayerTime }) => {
    const cardData = [
        { img: "https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2", title: "الفجر", time: prayerTime.Fajr },
        { img: "https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921", title: "الظهر", time: prayerTime.Dhuhr },
        { img: "https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf", title: "العصر", time: prayerTime.Asr },
        { img: "https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5", title: "المغرب", time: prayerTime.Sunset },
        { img: "https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d", title: "العشاء", time: prayerTime.Isha },
    ];
    return (
        <Row className='cards'>
            {cardData.map((prayer, i) => (
                <Flip left key={i}>
                    <Card>
                        <Card.Img variant="top" src={prayer.img} />
                        <Card.Body>
                            <b>{prayer.title}</b>
                            <h3>{moment(prayer.time, "hh:mm").format("hh:mm")}</h3>
                        </Card.Body>
                    </Card>
                </Flip>
            ))
            }
        </Row >
    );
};
export default PrayerCards;
