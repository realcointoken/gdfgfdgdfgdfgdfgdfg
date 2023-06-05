import React, {Component} from 'react'

import {Upload, message, Modal} from 'antd'
import {isEmpty} from 'lodash'

import uploadIcon from './img/upload.png'
import deleteIcon from './img/delete.png'
import style from './UploadValidation.module.scss'

class UploadValidation extends Component {
  constructor(props) {
    super(props)

    var tInfo = props.notPDF
      ? 'PNG, JPG, SVG, max 3MB'
      : 'PNG, JPG, SVG, PDF, max 3MB'

    this.state = {
      imageUrl: null,
      //textInfo: 'PNG, JPG, SVG, PDF, max 3MB',
      textInfo: tInfo,
      error: false,
      loading: false,
      fileList: [],
      previewVisible: false,
      previewImage: '',
      selectedFile: null,
    }
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  }

  getUploadFieldProps = () => {
    const uploadProps = {
      onRemove: (file) => {
        this.setState({
          imageUrl: null,
          error: false,
          fileList: [],
          textInfo: this.tInfo,
        })
      },
      beforeUpload: (file) => {
        var isJpgOrPng = ''
        if (!this.props.notPDF) {
          isJpgOrPng = /^(image|application\/pdf).*?/i.test(file.type)
        } else {
          isJpgOrPng = /^(image).*?/i.test(file.type)
        }
        const isLt3M = file.size / 1024 / 1024 < 3

        if (!isJpgOrPng) {
          if (!this.props.notPDF)
            return message.error('You can only upload PNG/JPG/SVG/PDF file!')
          else return message.error('You can only upload PNG/JPG/SVG file!')
        }

        if (!isLt3M) {
          return this.setState(
            {
              imageUrl: null,
              textInfo: 'The file is too large. Use a maximum file of 3MB',
              error: true,
              fileList: [file],
            },
            () => this.props.onChange(this.state.error)(),
          )
        }

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
          file.url = reader.result

          this.setState(
            {
              imageUrl: file,
              error: false,
              textInfo: 'Upload. Image1.jpg',
              fileList: [...this.state.fileList, file],
            },
            () => this.props.onChange(this.state.error)(file),
          )
        }

        return false
      },
    }

    return {...uploadProps}
  }

  handleReupload = () => {
    this.setState(
      {
        error: false,
        textInfo: this.tInfo,
        imageUrl: null,
        fileList: [],
      },
      () => this.props.onChange(this.state.error)(null),
    )
  }

  handleFileInput = (e) => {
    this.setState({selectedFile: e.target.files[0]})
  }

  render() {
    const {imageUrl, error, textInfo, fileList, previewVisible, previewImage} =
      this.state
    const uploadProps = this.getUploadFieldProps()

    const renderUploadIcon = isEmpty(fileList) && (
      <img src={uploadIcon} alt='upload' style={{width: '50%'}} />
    )

    return (
      <div className={style.uploadContainer}>
        <p className={style.info}>{textInfo}</p>
        <Upload
          name='file'
          className='avatar-uploader'
          listType='picture-card'
          fileList={fileList}
          showUploadList={!error}
          onPreview={this.handlePreview}
          {...uploadProps}
        >
          {renderUploadIcon}
        </Upload>

        {error && (
          <div onClick={this.handleReupload} className={style.errorBtn}>
            <img src={deleteIcon} alt='delete' />
          </div>
        )}

        {imageUrl && (
          <p className={style.errorText} onClick={this.handleReupload}>
            Delete File
          </p>
        )}

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          centered
        >
          <img alt='example' style={{width: '100%'}} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default UploadValidation
