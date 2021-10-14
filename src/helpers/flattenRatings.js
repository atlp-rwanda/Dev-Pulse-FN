const deleteFeedback = (rating) => {

  const qualityValue = rating.quality.rate
  delete rating.quality.rate
  delete rating.quality.feedback
  rating.quality = qualityValue

  const quantityValue = rating.quantity.rate
  delete rating.quantity.rate
  delete rating.quantity.feedback
  rating.quantity = quantityValue

  const commValue = rating.communication.rate
  delete rating.communication.rate
  delete rating.communication.feedback
  rating.communication = commValue

  return rating
}
export default deleteFeedback