export interface ContactFormData {
  fullName: string
  email: string
  phone: string
  instagram: string
  inquiryType: string
  message: string
}

export interface ContactFormProps {
  onClose: () => void
}

export interface FormFieldsProps {
  formData: ContactFormData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSelectChange: (value: string) => void
  isDisabled: boolean
}