import React from 'react'
import withForm from '../../../higherComponent/withForm'

const PropsSetting = (options) => {
	const WrappedComponent = withForm(options)
	return WrappedComponent
}

export default PropsSetting
