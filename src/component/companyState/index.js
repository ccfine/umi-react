import { PureComponent, Fragment } from "react"
import PropTypes from "prop-types"

export default class CompanyState extends PureComponent {
  static propTypes = {
    state: PropTypes.number
  }

  static defaultProps = {
    state: 0
  }

  render () {
    let state = null
    if (this.props.state === 1) {
      state = <span style={{ color: "#FF0000", marginRight: "5px" }}>[已停用]</span>
    } else if (this.props.state === 2) {
      state = <span style={{ color: "#F7B655", marginRight: "5px" }}>[变更审核中]</span>
    } else if (this.props.state === 3) {
      state = <span style={{ color: "#FF0000", marginRight: "5px" }}>[变更已驳回]</span>
    } else if (this.props.state === 4) {
      state = <span style={{ color: "#F7B655", marginRight: "5px" }}>[审核中]</span>
    } else if (this.props.state === 5) {
      state = <span style={{ color: "#FF0000", marginRight: "5px" }}>[已驳回]</span>
    } else if (this.props.state === 6) {
      state = <span style={{ color: "#F7B655", marginRight: "5px" }}>[暂存]</span>
    } else {
      state = null
    }
    return (
      <Fragment>
        { state }
      </Fragment>
    )
  }
}