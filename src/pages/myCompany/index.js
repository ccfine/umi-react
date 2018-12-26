import { Component } from "react"
import { Spin, Row, Col, Button, Card, Pagination } from "antd"
import { connect } from "dva"

class MyCompany extends Component {
  constructor () {
    super() 
    this.state = {
      pageNum: 1,
      pageSize: 9
    }
  }

  componentDidMount () {
    // this.props.getCompanyList(this.state)
  }

  handleChangePage (page) {
    this.setState({
      pageNum: page
    }, () => {
      // this.props.getCompanyList(this.state)
    })
  }

  render () {
    const { companyList, loading, total } = this.props
    // console.log(data)
    return (
      <div className="container">
        <Spin spinning={ loading }>
          <Row>
            <Col span={ 12 }>
              <h2>我的公司</h2>
            </Col>
            <Col span={ 12 } style={{ textAlign: "right" }}>
              <Button type="primary">创建或加入公司</Button>
            </Col>
          </Row>
          <div style={{ margin: "10px 0 20px" }}>
            <Row gutter={ 20 }>
              {
                companyList.length? (companyList.map(company => (
                  <Col span={ 8 } key={ company.id }>
                    <Card style={{ backgroundColor: "#F2F2F2" }} bordered={ false }>
                      { company.name }
                    </Card>
                  </Col>
                ))
                ): (
                  <Col span={ 24 }>
                    <Card style={{ backgroundColor: "#F2F2F2", textAlign: "center" }} bordered={ false }>
                      暂无公司
                    </Card>
                  </Col>
                )
              }
            </Row>
          </div>
          <Pagination current={ this.state.pageNum }  pageSize={ this.state.pageSize } showQuickJumper={ true } 
            size="small" total={ total } onChange={ page => this.handleChangePage(page) } />
        </Spin>
      </div>
    )
  }
}

const mapStateToProps = state => state.myCompany

const mapDispatchToProps = dispatch => ({
  getCompanyList: payload =>
    dispatch({
      type: "myCompany/getCompanyList", 
      payload
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(MyCompany)