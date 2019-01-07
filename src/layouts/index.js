import { Breadcrumbs } from "scd"

function BasicLayout(props) {
  return (
    <div>
      <Breadcrumbs route={ props.route } location={ props.location } />
      { props.children }
    </div>
  )
}

export default BasicLayout