import React from 'react'

const Alert = (props) => {
  return (
    <div>
        {props.alert && <div className={`p-4 mb-4 text-sm text-${props.alert.type}-700 bg-${props.alert.type}-100 rounded-lg dark:bg-${props.alert.type}-200 dark:text-${props.alert.type}-800" role="alert`}>
            <span className="font-medium">{props.alert.msg}</span>
        </div>}
    </div>
  )
}

export default Alert