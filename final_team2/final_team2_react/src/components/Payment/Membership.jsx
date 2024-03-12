import React, {useState} from 'react';
import SubPayment from './SubPayment';
import bronze from '../../img/bronze.png';
import silver from '../../img/silver.png';
import gold from '../../img/gold.png';
import vip from '../../img/vip.png';
import Header from "../../layout/Header";
import Category from "../../layout/Category";
import Button from '@mui/material/Button';
import Footer from "../../layout/Footer";

const Membership = () => {
    const [selectedLevel, setSelectedLevel] = useState("");
    const [agreed, setAgreed] = useState(false);


    const handleLevelClick = (level) => {
        setSelectedLevel(level);
    };

    // 레벨에 따른 가격 설정
    const getAmount = (level) => {
        switch(level) {
            case "Bronze":
                return 49800;
            case "Silver":
                return 79800;
            case "Gold":
                return 148000;
            case "VIP":
                return 298000;
            default:
                return 0;
        }
    };

    return (
        <div>
            <div style={{margin: '0 400px'}}>
                <Header/>
            </div>
            <div style={{padding: '0 400px', position: 'sticky', top: '-1px', zIndex: '1', backgroundColor: 'white'}}>
                <Category/>
            </div>
            <div>
                <div>
                    <div style={{height: '58px'}}></div>
                    <div style={{textAlign: 'center'}}>
                        <img src="https://cdn.imweb.me/thumbnail/20220517/f7d3515d501a6.png" alt=""
                             style={{height: '103px', margin: '0 auto', marginTop: '30px', marginBottom: '30px'}}/>
                    </div>
                    <div>
                        <h6 style={{
                            textAlign: 'center',
                            lineHeight: '1.15',
                            fontSize: '40px',
                            letterSpacing: '-1px',
                            color: '#94877F',
                            marginTop: '5px'

                        }}>
                            <strong>월간 프리미엄 와인 서비스</strong>
                        </h6>
                    </div>
                    <div style={{height: '-23px'}}></div>
                    <div style={{color: '#94877F'}}>
                        <p style={{
                            textAlign: 'center',
                            lineHeight: '1.5',
                            fontSize: '18px',
                            letterSpacing: '-1px',
                            marginTop: '50px'
                        }}>
                            품격 있는 와인을 간편하게 즐기세요.
                        </p>
                        <p style={{
                            textAlign: 'center',
                            lineHeight: '5px',
                            fontSize: '18px',
                            letterSpacing: '-1px',
                            marginBottom: '50px'
                        }}>
                            저희의 멤버스로 가입하고, 더 이상 와인을 찾아 다니지 마세요.
                        </p>
                    </div>
                    <div style={{height: '65px'}}></div>
                </div>
            </div>
            <div style={{backgroundColor: `#fbf5f1`}}>
                <div className={`container`}>
                    <div style={{height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <h6 style={{textAlign: 'center', lineHeight: '1.15'}}>
                <span style={{fontSize: '40px', letterSpacing: '-1px', color: 'rgb(148, 135, 127)'}}>
                    <strong>멤버십 프로그램</strong>
                </span>
                        </h6>
                    </div>


                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <div style={{
                            backgroundColor: `#ffffff`,
                            border: selectedLevel === "Bronze" ? '1px solid #FF6001' : 'none'
                        }}>
                            <table style={{
                                width: '100%',
                                color: '#444444'
                            }} onClick={() => handleLevelClick("Bronze")}>
                                <tbody>
                                <tr>
                                    <td style={{width: '100%'}}>
                                        <div style={{textAlign: 'center'}}>
                                            <img src={bronze} style={{width: 200, height: 200}}
                                                 className="fr-fin fr-dib" alt="Bronze"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: '100%'}}>
                                        <h6 style={{textAlign: 'center'}}>
                <span style={{fontSize: '30px'}}>
                    <strong><span style={{
                        letterSpacing: '-1px',
                        color: '#F28A7A',
                        marginBottom: '30px'
                    }}>브론즈</span><span style={{fontSize: '25px'}}>&nbsp;회원</span></strong>
                </span>
                                        </h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{
                                        width: '100%',
                                        height: '100px',
                                        verticalAlign: 'top',
                                        marginTop: '20px'
                                    }}>
                                        <div style={{textAlign: 'center'}}>
                                            <span style={{fontSize: '16px', lineHeight: '1.0'}}>월 1회</span>
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                                    <span
                                                        style={{fontSize: '16px', lineHeight: '1.0'}}>일반 와인 2~3병</span>
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                <span style={{
                    fontSize: '16px',
                    marginBottom: '10px'
                }}>3% 할인 적용</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: '100%'}}>
                                        <h6 style={{textAlign: 'center'}}>
                                                    <span
                                                        style={{fontSize: '16px'}}>월<strong>&nbsp;</strong></span><span
                                            style={{fontSize: '30px'}}><strong><span
                                            style={{color: '#F28A7A'}}>49,800</span></strong></span>
                                        </h6>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>


                        {/* 다른 레벨에 대한 정보도 동일한 방식으로 작성 */}
                        {/* Silver 레벨 */}
                        <div style={{
                            backgroundColor: `#ffffff`,
                            border: selectedLevel === "Silver" ? '1px solid #FF6001' : 'none'
                        }}>
                            <table style={{width: '100%'}} onClick={() => handleLevelClick("Silver")}>
                                <tbody>
                                <tr>
                                    <td style={{width: '100%'}}>
                                        <div style={{textAlign: 'center'}}>
                                            <img src={silver} style={{width: 200, height: 200}}
                                                 className="fr-fin fr-dib" alt="Silver"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: '100%'}}>
                                        <h6 style={{textAlign: 'center'}}>
                                        <span style={{fontSize: '30px'}}>
                                            <strong><span style={{
                                                letterSpacing: '-1px',
                                                color: 'rgb(182, 174, 168)'
                                            }}>실버</span><span style={{fontSize: '25px'}}>&nbsp;회원</span></strong>
                                        </span>
                                        </h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: '100%', height: '100px', verticalAlign: 'top'}}>
                                        <div style={{textAlign: 'center'}}>
                                            <span style={{fontSize: '16px', lineHeight: '1.0'}}>월 1회</span>
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            <span style={{fontSize: '16px', lineHeight: '1.0'}}>일반 와인 3~4병</span>
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                                <span style={{
                                                    fontSize: '16px',
                                                    marginBottom: '10px'
                                                }}>5% 할인 적용</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: '100%'}}>
                                        <h6 style={{textAlign: 'center'}}>
                                            <span style={{fontSize: '16px'}}>월<strong>&nbsp;</strong></span><span
                                            style={{fontSize: '30px'}}><strong><span
                                            style={{color: 'rgb(182, 174, 168)'}}>79,800</span></strong></span>
                                        </h6>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>


                        {/* Gold 레벨 */}
                        <div style={{
                            backgroundColor: `#ffffff`,
                            border: selectedLevel === "Gold" ? '1px solid #FF6001' : 'none'
                        }}>
                            <table style={{width: '100%'}} onClick={() => handleLevelClick("Gold")}>
                                <tbody>
                                <tr>
                                    <td style={{width: '100%'}}>
                                        <div style={{textAlign: 'center'}}>
                                            <img src={gold} style={{width: 200, height: 200}}
                                                 className="fr-fin fr-dib" alt="Gold"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: '100%'}}>
                                        <h6 style={{textAlign: 'center'}}>
                                        <span style={{fontSize: '30px'}}>
                                            <strong><span style={{
                                                letterSpacing: '-1px',
                                                color: '#F2DE7A'
                                            }}>골드</span><span style={{fontSize: '25px'}}>&nbsp;회원</span></strong>
                                        </span>
                                        </h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: '100%', height: '100px', verticalAlign: 'top'}}>
                                        <div style={{textAlign: 'center'}}>
                                            <span style={{fontSize: '16px', lineHeight: '1.0'}}>월 1회</span>
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            <span style={{fontSize: '16px', lineHeight: '1.0'}}>고급 와인 2~3병</span>
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                                <span style={{
                                                    fontSize: '16px',
                                                    marginBottom: '10px'
                                                }}>7% 할인 적용</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: '100%'}}>
                                        <h6 style={{textAlign: 'center'}}>
                                            <span style={{fontSize: '16px'}}>월<strong>&nbsp;</strong></span><span
                                            style={{fontSize: '30px'}}><strong><span
                                            style={{color: '#F2DE7A'}}>148,000</span></strong></span>
                                        </h6>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>


                        {/* VIP 레벨 */}
                        <div style={{
                            backgroundColor: `#ffffff`,
                            border: selectedLevel === "VIP" ? '1px solid #FF6001' : 'none'
                        }}>
                            <table style={{width: '100%'}}>
                                <tbody onClick={() => handleLevelClick("VIP")}>
                                <tr>
                                    <td style={{width: '100%'}}>
                                        <div style={{textAlign: 'center'}}>
                                            <img src={vip} style={{width: 200, height: 200}}
                                                 className="fr-fin fr-dib" alt="VIP"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: '100%'}}>
                                        <h6 style={{textAlign: 'center'}}>
                                        <span style={{fontSize: '30px'}}>
                                            <strong><span style={{
                                                letterSpacing: '-1px',
                                                color: '#6600CC'
                                            }}>VIP</span><span style={{fontSize: '25px'}}>&nbsp;회원</span></strong>
                                        </span>
                                        </h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: '100%', height: '100px', verticalAlign: 'top'}}>
                                        <div style={{textAlign: 'center'}}>
                                            <span style={{fontSize: '16px', lineHeight: '1.0'}}>월 1회</span>
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            <span style={{fontSize: '16px', lineHeight: '1.0'}}>최고급 와인 2~3병</span>
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            <span
                                                style={{fontSize: '16px', lineHeight: '1.0'}}>10% 할인 적용</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: '100%'}}>
                                        <h6 style={{textAlign: 'center'}}>
                                            <span style={{fontSize: '16px'}}>월<strong>&nbsp;</strong></span><span
                                            style={{fontSize: '30px'}}><strong><span
                                            style={{color: '#6600CC'}}>298,000</span></strong></span>
                                        </h6>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{marginTop: '50px', textAlign: 'center', marginBottom: '100px'}}>
                        {!selectedLevel && (
                            <Button
                                variant="contained"
                                sx={{
                                    paddingTop: '12px',
                                    borderRadius: '20px',
                                    width: '220px',
                                    height: '50px',
                                    fontSize: '18px'
                                }}
                                disabled
                            >
                                멤버십을 선택하세요
                            </Button>
                        )}
                        {selectedLevel && (
                            <SubPayment level={selectedLevel} amount={getAmount(selectedLevel)}/>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default Membership;