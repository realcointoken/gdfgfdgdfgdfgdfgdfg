import React, {useEffect, useState} from 'react'
import {Row, Col} from 'react-bootstrap'
import './Overview.scss'
import Table from 'react-bootstrap/Table'
import {useSelector, useDispatch} from 'react-redux'
import {GetAllinvestmentAction} from '../../store/actions/GetAllinvestmentAction'

function Overview() {
  const allInvestment = useSelector((state) => state?.GetAllinvestment)
  const balance = useSelector((state) => state?.user?.userAccount?.balance)
  const [userBalance, setUserBalance] = useState()
  const [allInvestmentData, setAllInvestmentData] = useState([])

  console.log(balance)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(GetAllinvestmentAction())
        .then((res) => {
          setAllInvestmentData(res.data)
          console.log('GetAllinvestmentAction', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }, 2000)
  }, [])

  useEffect(() => {
    setAllInvestmentData(allInvestmentData)
  }, [allInvestmentData])

  return (
    <>
      <Row>
        {/* <Col md={12} className='leftbox'>
          <div className='Balance'>
            <h2>Balance</h2>
            <div className='balancebtm'>
              <div className='Balncemai'>
                <h5>Current Balance</h5>
                <strong>{balance}</strong>
              </div>
              <div className='Balncemai'></div>
            </div>
          </div>
          <div className='wallet'>
            <h2>Apy Reward</h2>
            <div className='bth'>
              <div className='over'>asadasdasd</div>
              <div className='over'>asadasdasd</div>
              <div className='over'>asadasdasd</div>
            </div>
          </div>
        </Col> */}
        <Col md={12}>
          <div className='bottomm'>
            <Table
              striped
              hover
              style={{backgroundColor: '#343d56', border: 'none'}}
            >
              <thead>
                <tr
                  style={{
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  <th
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    Project ID
                  </th>
                  <th
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    Token Allocation
                  </th>
                  <th
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    Token Transaction
                  </th>
                  <th
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    Token Allocation Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {allInvestmentData &&
                  allInvestmentData?.map((item, index) => (
                    <tr
                      style={{
                        color: 'white',
                        textAlign: 'center',
                      }}
                      key={index}
                    >
                      <td>{item.projectId}</td>
                      <td>{item.amount}</td>
                      <td>{item.tokenAllocation}</td>
                      <td>{item.tokenTransactionStatus}</td>
                      <td>{item.tokenAllocationStatus}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Overview
