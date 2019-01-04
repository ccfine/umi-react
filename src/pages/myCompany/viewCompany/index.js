import { Component } from "react"
import { Spin, Button } from "antd"
import { connect } from "dva"
import CompanyState from "components/companyState"
import CompanyInformation from "components/companyInformation"

class ViewCompany extends Component {
  componentDidMount () {
    const { query } = this.props.location,
          { id, state } = query
    this.props.getCompanyInformation(query)
    //暂存、驳回状态需要审核结果
    if (state === "3" || state === "5" || state === "6") {
      this.props.getAuditResult(id)
    }
  }

  render () {
    const { loading, companyInformation, auditResult } = this.props,
          { state, name } = companyInformation
    
    return (
      <div className="container">
        <Spin spinning={ loading }>
          <h2>
            <CompanyState state={ state } />{ name }
          </h2>
          <CompanyInformation information={ companyInformation } result={ auditResult } />
          {
            state === 0? (
              <Button>申请加入公司</Button>
            ): null
          }
        </Spin>
      </div>
    )
  }
}

const mapStateToProps = state => state.viewCompany

const mapDispatchToProps = dispatch => ({
  getCompanyInformation: payload =>
    dispatch({
      type: "viewCompany/getCompanyInformation", 
      payload
    }),
  getAuditResult: id => 
    dispatch({
      type: "viewCompany/getAuditResult",
      id
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewCompany)