import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { BRAND_COMPONENT } from '../../constants/route-path-constant';

const data = [
  'ALMAY',
  'ANASTASIA BEVERLY HILLS',
  'BARE MINERALS',
  'BECCA',
  'BENEFIT',
  'BIOTHERM',
  'BLISS',
  'BOBBI BROWN',
  'CHRISTIAN DIOR',
  'CHRISTIAN LOUBOUTIN',
  'CLARINS',
  'CLINIQUE',
  'CND',
  'COLGATE',
  'COVER FX',
  'COVERGIRL',
  'CREST',
  'CUTEX',
  'DARPHIN',
  'DDF',
  'DOLCE & GABBANA',
  'ELIZABETH ARDEN',
  'ESSIE',
  'ESTEE LAUDER',
  'EVE LOM',
  'EXUVIANCE',
  'FASHION FAIR',
  'FLESH',
  'GARNIER',
  'GLAMGLOW',
  'HASK',
  'KAT VON D',
  'KEVYN AUCOIN',
  'KISS MY FACE',
  'L’OCCITANE',
  'L’OREAL',
  'LA MER',
  'LA PRAIRIE',
  'LANCOME PARIS',
  'LAURA MERCIER',
  'LIPSTICK QUEEN',
  'MAC',
  'MAKEUP FOREVER',
  'MATRIX',
  'MAX FACTOR',
  'MAYBELLINE',
  'MILK MAKEUP',
  'MOROCCAN OIL',
  'NAIL-AID',
  'NARS',
  'NATASHA DENONA',
  'NIOXIN',
  'NYX',
  'OLAY',
  'OLE HENRIKSEN',
  'OPI',
  'ORIBE',
  'ORIGINS',
  'ORS',
  'PANTENE',
  'PERRICONE MD',
  'PETER THOMAS ROTH',
  'REDKEN',
  'REVLON',
  'RIMMEL',
  'RUSK',
  'SCHWARZKOPF',
  'SHISEIDO',
  'SISLEY PARIS',
  'SMASHBOX',
  'SOFTSOAP',
  'STILA',
  'STRIVECTIN',
  'SUAVE',
  'TARTE',
  'TIGI',
];
const obj = Object.fromEntries(
  data.map((year, i) => [
    i,
    {
      name: year,
      id: i + 1,
    },
  ]),
);

let objdata = Object.values(obj).map((e) => e);

function BrandComponents() {
  return (
    <>
      <div className="brand-container">
        <Row>
          {objdata.map((e) => {
            return (
              <>
                {e.id < 12 ? (
                  <Col key={e.id} xs="12" md="3" id={e.id} className="text-left">
                    <Link key={e.id} to={BRAND_COMPONENT(e.name.replaceAll(' ', '-'))}>
                      {e.name}
                    </Link>
                  </Col>
                ) : (
                  ''
                )}
                {e.id > 13 && e.id < 26 ? (
                  <Col key={e.id} xs="12" md="3" id={e.id} className="text-left">
                    <Link key={e.id} to={BRAND_COMPONENT(e.name.replaceAll(' ', '-'))}>
                      {e.name}
                    </Link>
                  </Col>
                ) : (
                  ''
                )}
                {e.id > 27 && e.id < 38 ? (
                  <Col key={e.id} xs="12" md="3" id={e.id} className="text-left">
                    <Link key={e.id} to={BRAND_COMPONENT(e.name.replaceAll(' ', '-'))}>
                      {e.name}
                    </Link>
                  </Col>
                ) : (
                  ''
                )}
                {e.id > 39 && e.id < 50 ? (
                  <Col key={e.id} xs="12" md="3" id={e.id} className="text-left">
                    <Link key={e.id} to={BRAND_COMPONENT(e.name.replaceAll(' ', '-'))}>
                      {e.name}
                    </Link>
                  </Col>
                ) : (
                  ''
                )}
                {e.id > 51 && e.id < 64 ? (
                  <Col key={e.id} xs="12" md="3" id={e.id} className="text-left">
                    <Link key={e.id} to={BRAND_COMPONENT(e.name.replaceAll(' ', '-'))}>
                      {e.name}
                    </Link>
                  </Col>
                ) : (
                  ''
                )}
                {e.id > 65 && e.id < 74 ? (
                  <Col key={e.id} xs="12" md="3" id={e.id} className="text-left">
                    <Link key={e.id} to={BRAND_COMPONENT(e.name.replaceAll(' ', '-'))}>
                      {e.name}
                    </Link>
                  </Col>
                ) : (
                  ''
                )}
              </>
            );
          })}
        </Row>
      </div>
    </>
  );
}

export default BrandComponents;
