import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
const Header = (props) => {
    Header.propTypes = {
        today: PropTypes.string,
        cityName: PropTypes.string,
        timer: PropTypes.string,
        nextPrayer: PropTypes.string,
    };
    return (
        <Row className='date-time'>
            <Col>
                <p>{props.today}</p>
                <h3>{props.cityName}</h3>
            </Col>
            <Col className='timer'>
                <h4>متبقي {props.timer} حتى صلاة {props.nextPrayer}</h4>
            </Col>
        </Row>
    );
};
export default Header;
