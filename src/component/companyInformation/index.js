import { PureComponent, Fragment } from "react"
import { Card, Row, Col, Icon, Modal, Button } from "antd"
import PropTypes from "prop-types"
import { getDate } from "utils/date.js"

export default class CompanyInformation extends PureComponent {
  static propTypes = {
    information: PropTypes.object.isRequired
  }

  constructor () {
    super()
    this.state = {
      visible: false
    }
    this.handleShowConfirm = this.handleShowConfirm.bind(this)
    this.handleToggleModal = this.handleToggleModal.bind(this)
  }

  handleShowConfirm () {
    Modal.confirm({
      cancelText: "取消",
      okText: "确定",
      title: "编辑更改此模块的信息会需要重新审核，是否确定去更改？",
      onOk: () => this.handleToggleModal()
    })
  }

  handleToggleModal () {
    this.setState({
      visible: !this.state.visible
    })
  }

  render () {
    const { name, creditCode, companyPlaceRegister, companyPlace, dueStartDate, dueEndDate, companyType, businessScope, 
      companyLogo, businessLicenceId, legalPersonName, legalPersonCode, legalParValStaTime, legalParValEndTime, 
      legalPersonPhone, legalPersonEmail, legalPersonIds, state
    } = this.props.information
    let type = ""
    switch (companyType) {
      case 0:
        type = "集团"
        break
      case 1: 
        type = "独立公司"
        break
      case 2:
        type = "法人公司"
        break
      default:
    }

    return (
      <Fragment>
        { /*驳回、暂存状态可编辑，审核状态不可编辑*/ }
        <Card title="公司信息" style={{ marginBottom: "20px" }} extra={ state === 3 || state === 5 || state === 6? (<a onClick={ this.handleShowConfirm }>编辑</a>): null }>
          <Row>
            <Col span={ 12 }>
              <div style={{ marginBottom: "10px" }}>公司名称：{ name }</div>
              <div style={{ marginBottom: "10px" }}>统一社会信用代码：{ creditCode }</div>
              <div style={{ marginBottom: "10px" }}>公司注册地址：{ companyPlaceRegister }</div>
              <div style={{ marginBottom: "10px" }}>经营地址：{ companyPlace }</div>
              <div style={{ marginBottom: "10px" }}>营业期限：{ getDate(dueStartDate) } ~ { getDate(dueEndDate) }</div>
              <div style={{ marginBottom: "10px" }}>公司类型：{ type }</div>
              <div style={{ marginBottom: "10px" }}>营业范围：{ businessScope }</div>
              <div>
                公司logo：<img src={ companyLogo } alt="公司logo" />
              </div>
            </Col>  
            <Col span={ 12 }>
              <div>
                营业执照证件：<br /><img src={ businessLicenceId }  alt="营业执照证件" />
              </div>
            </Col>
          </Row>     
        </Card>
        <Card title="法人代表信息" style={{ marginBottom: "20px" }} extra={ state === 3 || state === 5 || state === 6? (<a onClick={ this.handleShowConfirm }>编辑</a>): null }>
          <Row>
            <Col span={ 10 }> 
              <div style={{ marginBottom: "10px" }}>姓名：{ legalPersonName }</div>
              <div style={{ marginBottom: "10px" }}>身份证号：{ legalPersonCode }</div>
              <div style={{ marginBottom: "10px" }}>证件有效期：{ getDate(legalParValStaTime) } ~ { getDate(legalParValEndTime) }</div>
              <div style={{ marginBottom: "10px" }}>手机：{ legalPersonPhone }</div>
              <div>邮箱：{ legalPersonEmail }</div>
            </Col>  
            <Col span={ 12 }>
              <div>
                证件：<br /><img src={ legalPersonIds }  alt="身份证正面" /><img src={ legalPersonIds }  alt="身份证背面" />
              </div>
            </Col>
          </Row>          
        </Card>
        <Card title="管理员信息" style={{ marginBottom: "20px" }} extra={ state === 3 || state === 5 || state === 6? (<a onClick={ this.handleShowConfirm }>编辑</a>): null }>
          <Row>
            <Col span={ 10 }>
              <div>姓名：</div>
            </Col>  
            <Col span={ 12 }>
              <div>
                授权书：<a>下载</a>
              </div>
            </Col>
          </Row>         
        </Card>
        {
          state === 0? null: (
            <Card title="审核结果" style={{ marginBottom: "20px" }}>
              {
                state === 2 || state === 4? null: (
                  <div style={{ display: "flex" }}>
                    <Icon type="close-circle" theme="filled" style={{ color: "red", margin: "4px 10px 0 0" }} /> 
                    <div>
                      <div style={{ marginBottom: "10px" }}>审核说明的文字内容：</div>
                      <div>审核时间： 审核人： 审核类型：</div>
                    </div>
                  </div>
                )
              }
            </Card>
          )
        }

        <Modal visible={ this.state.visible } title="编辑XX信息" centered={ true } destroyOnClose={ true } maskClosable={ false }
          onCancel={ this.handleToggleModal } footer={(
            <div>
              <Button onClick={ this.handleToggleModal }>取消</Button>
              <Button style={{ margin: "0 10px" }} onClick={ this.handleToggleModal }>继续编辑其他信息</Button>
              <Button type="primary">提交审核</Button>
            </div>
          )}
        >
        </Modal>
      </Fragment>
    )
  }
}