import { Component, Fragment } from "react"
import { Card, Row, Col, Icon, Modal, Button, Form, Input, DatePicker, Select, Upload } from "antd"
import moment from "moment"
import PropTypes from "prop-types"
import { getDate } from "utils/date.js"

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

const dateFormat = "YYYY-MM-DD"

class CompanyInformation extends Component {
  static propTypes = {
    information: PropTypes.object.isRequired,
    result: PropTypes.object.isRequired
  }

  constructor () {
    super()
    this.state = {
      visible: false,
      info: 1
    }
    this.handleToggleModal = this.handleToggleModal.bind(this)
  }

  handleShowConfirm (info) {
    this.setState({ info })

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
    const { information: { state, name, creditCode, companyPlaceRegister, companyPlace, dueStartDate, dueEndDate, companyType, businessScope, companyLogoURL,
                           businessLicenceIdURL, legalPersonName, legalPersonCode, legalParValStaTime, legalParValEndTime, legalPersonPhone, legalPersonMail, 
                           legalPerFacePhotoURL, legalPerBackPhotoURL, createBy, authorizationIdURL },
            result: { processRemark, updateBy, updateTime, verificationState },
            form: { getFieldDecorator }
          } = this.props,
          { visible, info } = this.state

    return (
      <Fragment>
        { /*驳回、暂存状态可编辑，审核状态不可编辑*/ }
        <Card title="公司信息" style={{ marginBottom: "20px" }} extra={ state === 3 || state === 5 || state === 6? (<a onClick={ () => this.handleShowConfirm(1) }>编辑</a>): null }>
          <Row>
            <Col span={ 12 }>
              <div style={{ marginBottom: "10px" }}>公司名称：{ name }</div>
              <div style={{ marginBottom: "10px" }}>统一社会信用代码：{ creditCode }</div>
              <div style={{ marginBottom: "10px" }}>公司注册地址：{ companyPlaceRegister }</div>
              <div style={{ marginBottom: "10px" }}>经营地址：{ companyPlace }</div>
              <div style={{ marginBottom: "10px" }}>营业期限：{ getDate(dueStartDate) } ~ { getDate(dueEndDate) }</div>
              <div style={{ marginBottom: "10px" }}>公司类型：{ companyType === 0? "集团": companyType === 1? "独立公司": companyType === 2? "法人公司": "" }</div>
              <div style={{ marginBottom: "10px" }}>营业范围：{ businessScope }</div>
              <div>
                公司logo：<img src={ companyLogoURL } alt="公司logo" />
              </div>
            </Col>  
            <Col span={ 12 }>
              <div style={{ marginBottom: "10px" }}>营业执照证件：</div>
              <img src={ businessLicenceIdURL } alt="营业执照证件" />
            </Col>
          </Row>     
        </Card>
        <Card title="法人代表信息" style={{ marginBottom: "20px" }} extra={ state === 3 || state === 5 || state === 6? (<a onClick={ () => this.handleShowConfirm(2) }>编辑</a>): null }>
          <Row>
            <Col span={ 10 }> 
              <div style={{ marginBottom: "10px" }}>姓名：{ legalPersonName }</div>
              <div style={{ marginBottom: "10px" }}>身份证号：{ legalPersonCode }</div>
              <div style={{ marginBottom: "10px" }}>证件有效期：{ getDate(legalParValStaTime) } ~ { getDate(legalParValEndTime) }</div>
              <div style={{ marginBottom: "10px" }}>手机：{ legalPersonPhone }</div>
              <div>邮箱：{ legalPersonMail }</div>
            </Col>  
            <Col span={ 12 }>
              <div style={{ marginBottom: "10px" }}>证件：</div>
              <img src={ legalPerFacePhotoURL } alt="身份证正面" style={{ marginRight: "20px" }} /><img src={ legalPerBackPhotoURL } alt="身份证背面" />
            </Col>
          </Row>          
        </Card>
        <Card title="管理员信息" style={{ marginBottom: "20px" }} extra={ state === 3 || state === 5 || state === 6? (<a onClick={ () => this.handleShowConfirm(3) }>编辑</a>): null }>
          <Row>
            <Col span={ 10 }>
              <div>姓名：{ createBy }</div>
            </Col>  
            <Col span={ 12 }>
              <div>
                授权书：<a href={ authorizationIdURL }>下载</a>
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
                      <div style={{ marginBottom: "10px" }}>审核说明：{ processRemark }</div>
                      <div>
                        <span>审核时间：{ getDate(updateTime) }</span>
                        <span style={{ margin: "0 10px" }}>审核人：{ updateBy }</span>
                        <span>审核类型：{ verificationState === 0? "待验证": verificationState === 1? "验证通过": verificationState === 2? "验证不通过": "" }</span>
                      </div>
                    </div>
                  </div>
                )
              }
            </Card>
          )
        }

        <Modal visible={ visible } title={ `编辑${info === 1? "公司": info === 2? "法人": info === 3? "管理员": ""}信息` } centered={ true } 
               destroyOnClose={ true } maskClosable={ false } width={ 700 } onCancel={ this.handleToggleModal } 
               footer={(
                 <div>
                   <Button onClick={ this.handleToggleModal }>取消</Button>
                   <Button style={{ margin: "0 10px" }} onClick={ this.handleToggleModal }>继续编辑其他信息</Button>
                   <Button type="primary">提交审核</Button>
                 </div>
               )}
        >    
          {
            info === 1? (
              <Form>
                <Form.Item label="公司名称" { ...formItemLayout }>
                  {
                    getFieldDecorator("name", {
                      initialValue: name
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item label="统一社会信用代码" { ...formItemLayout }>
                  {
                    getFieldDecorator("creditCode", {
                      initialValue: creditCode
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item label="公司注册地址" { ...formItemLayout }>
                  {
                    getFieldDecorator("companyPlaceRegister", {
                      initialValue: companyPlaceRegister
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item label="经营地址" { ...formItemLayout }>
                  {
                    getFieldDecorator("companyPlace", {
                      initialValue: companyPlace
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item label="营业期限" { ...formItemLayout }>
                  {
                    getFieldDecorator("dueDate", {
                      initialValue: [moment(getDate(dueStartDate), dateFormat), moment(getDate(dueEndDate), dateFormat)]
                    })(
                      <DatePicker.RangePicker style={{ width: "100%" }} />
                    )
                  }
                </Form.Item>
                <Form.Item label="公司类型" { ...formItemLayout }>
                  {
                    getFieldDecorator("companyType", {
                      initialValue: companyType
                    })(
                      <Select>
                        <Select.Option value={ 0 }>集团</Select.Option>
                        <Select.Option value={ 1 }>独立公司</Select.Option>
                        <Select.Option value={ 2 }>法人公司</Select.Option>
                      </Select>
                    )
                  }
                </Form.Item>
                <Form.Item label="营业范围" { ...formItemLayout }>
                  {
                    getFieldDecorator("businessScope", {
                      initialValue: businessScope
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item label="公司logo" labelCol={{ span: 6 }}>
                  {
                    getFieldDecorator("companyLogoURL", {
                      
                    })(
                      <Upload>

                      </Upload>
                    )
                  }
                </Form.Item>
                <Form.Item label="营业执照证件" labelCol={{ span: 6 }}>
                  {
                    getFieldDecorator("businessLicenceIdURL", {
                      
                    })(
                      <Upload>

                      </Upload>                      
                    )
                  }
                </Form.Item>
              </Form>
            ): info ===2? (
              <Form>
                <Form.Item label="姓名" { ...formItemLayout }>
                  {
                    getFieldDecorator("legalPersonName", {
                      initialValue: legalPersonName
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item label="身份证号" { ...formItemLayout }>
                  {
                    getFieldDecorator("legalPersonCode", {
                      initialValue: legalPersonCode
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item label="证件有效期" { ...formItemLayout }>
                  {
                    getFieldDecorator("legalDate", {
                      initialValue: [moment(getDate(legalParValStaTime), dateFormat), moment(getDate(legalParValEndTime), dateFormat)]
                    })(
                      <DatePicker.RangePicker style={{ width: "100%" }} />
                    )
                  }
                </Form.Item>
                <Form.Item label="手机" { ...formItemLayout }>
                  {
                    getFieldDecorator("legalPersonPhone", {
                      initialValue: legalPersonPhone
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item label="邮箱" { ...formItemLayout }>
                  {
                    getFieldDecorator("legalPersonMail", {
                      initialValue: legalPersonMail
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item label="证件" labelCol={{ span: 6 }}>
                  {
                    getFieldDecorator("legalPerPhotoURL", {
                      
                    })(
                      <Upload>

                      </Upload>
                    )
                  }
                </Form.Item>
              </Form>
            ): info === 3? (
              <Form>
                <Form.Item label="姓名" { ...formItemLayout }>
                  {
                    getFieldDecorator("createBy", {
                      initialValue: createBy
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
              </Form>         
            ): null
          }
        </Modal>
      </Fragment>
    )
  }
}

export default Form.create()(CompanyInformation)