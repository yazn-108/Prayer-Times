/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import PrayerCards from './components/cards/PrayerCards';
import Header from './components/date/Header';
import City from './components/city/City';
import moment from 'moment/moment';
const App = () => {
  const [today, setToday] = useState("");
  setInterval(() => setToday(moment().format("DD/MM/YYYY | hh:mm:ss")), 1000);
  const [cityName, setCityName] = useState({
    en: localStorage.getItem("cityAR") || "Makkah al Mukarramah",
    ar: localStorage.getItem("cityAR") || "مكة المكرمة",
  });
  const [prayerTime, setPrayerTime] = useState("");
  const Api = async () => {
    const url = await fetch(`https://api.aladhan.com/v1/timingsByCity?country=SA&city=${cityName.en}`);
    const Data = await url.json();
    setPrayerTime(Data.data.timings);
  };
  useEffect(() => { Api() }, [cityName]);
  const [nextPrayer, setNextPrayer] = useState({});
  const nextPrayerTime = () => {
    if (
      moment().isAfter(moment(prayerTime.Fajr, "hh:mm")) &&
      moment().isBefore(moment(prayerTime.Dhuhr, "hh:mm"))
    ) {
      setNextPrayer({
        ar: "الظهر",
        en: "Dhuhr",
      });
    } else if (
      moment().isAfter(moment(prayerTime.Dhuhr, "hh:mm")) &&
      moment().isBefore(moment(prayerTime.Asr, "hh:mm"))
    ) {
      setNextPrayer({
        ar: "العصر",
        en: "Asr",
      });
    } else if (
      moment().isAfter(moment(prayerTime.Asr, "hh:mm")) &&
      moment().isBefore(moment(prayerTime.Sunset, "hh:mm"))
    ) {
      setNextPrayer({
        ar: "المغرب",
        en: "Sunset",
      });
    } else if (
      moment().isAfter(moment(prayerTime.Sunset, "hh:mm")) &&
      moment().isBefore(moment(prayerTime.Isha, "hh:mm"))
    ) {
      setNextPrayer({
        ar: "العشاء",
        en: "Isha",
      });
    } else if (
      moment().isAfter(moment(prayerTime.Isha, "hh:mm")) &&
      moment().isBefore(moment(prayerTime.Fajr, "hh:mm"))
    ) {
      setNextPrayer({
        ar: "الفجر",
        en: "Fajr",
      });
    }
  };
  useEffect(() => { nextPrayerTime() }, [today, cityName]);
  let difference = moment(prayerTime[nextPrayer.en], "hh:mm").diff(moment());
  if (nextPrayer.en === "Fajr") {
    const fromNowUntilMidnight = moment("23:59:59", "hh:mm:ss").diff(moment())
    const fromMidnightUntilDawn = moment(prayerTime[nextPrayer.en], "hh:mm").diff(moment("00:00:00", "hh:mm:ss"))
    difference = fromNowUntilMidnight + fromMidnightUntilDawn
  }
  const residual = moment.duration(difference);
  return (
    <Container fluid="xxl">
      <Header
        today={today}
        cityName={cityName.ar}
        nextPrayer={nextPrayer.ar}
        timer={`${residual.hours()}:${residual.minutes()}:${residual.seconds()}`}
      />
      <PrayerCards prayerTime={prayerTime} />
      <City setCityName={setCityName} />
      <p className='footer'>created by <a href='https://yazn-108.github.io/' target='_blank' rel="noreferrer">@yazn_108</a> 2023</p>
    </Container>
  );
};
export default App;
