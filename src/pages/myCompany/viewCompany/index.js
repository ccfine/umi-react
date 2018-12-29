import { Component } from "react"
import { Spin } from "antd"
import { connect } from "dva"
import CompanyState from "component/companyState"
import CompanyInformation from "component/companyInformation"

class ViewCompany extends Component {
  componentDidMount () {
    this.props.getCompanyInformation(this.props.location.query)
  }

  render () {
    const { loading, companyInformation } = this.props,
          { state, name } = companyInformation

    return (
      <div className="container">
        <Spin spinning={ loading }>
          <h2>
            <CompanyState state={ state } />{ name }
          </h2>
          <CompanyInformation information={ companyInformation } />
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
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewCompany)