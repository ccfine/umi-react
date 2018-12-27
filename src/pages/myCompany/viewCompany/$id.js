import { Component } from "react"
import { Spin, Card, Row, Col } from "antd"

class ViewCompany extends Component {
  render () {
    return (
      <div className="container">
        <Spin spinning={ false }>
          <h2>深圳喜盈佳公司云服务有限公司</h2>
          <Card title="公司信息" style={{ marginBottom: "20px" }} extra={ <a>编辑</a> }>
            <Row>
              <Col span={ 12 } style={{border: "1px solid red"}}>
                1
              </Col>  
              <Col span={ 12 } style={{ textAlign: "right", border: "1px solid red"}}>
                1
              </Col>
            </Row>     
          </Card>
          <Card title="法人代表信息" style={{ marginBottom: "20px" }} extra={ <a>编辑</a> }>
            <Row>
              <Col span={ 10 } style={{border: "1px solid red"}}> 
                1
              </Col>  
              <Col span={ 12 } style={{border: "1px solid red"}}>
                1
              </Col>
            </Row>          
          </Card>
          <Card title="管理员信息" style={{ marginBottom: "20px" }} extra={ <a>编辑</a> }>
            <Row>
              <Col span={ 10 } style={{border: "1px solid red"}}>
                1
              </Col>  
              <Col span={ 12 } style={{border: "1px solid red"}}>
                1
              </Col>
            </Row>         
          </Card>

        </Spin>
      </div>
    )
  }
}

export default ViewCompany