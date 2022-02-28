const deleteFeedback = (rating) => {
  const formatedRating = {
    id: rating.id,
    trainee: rating.user.firstName + ' ' + rating.user.lastName,
    email: rating.user.email,
    quality: rating.quality.rate,
    quantity: rating.quantity.rate,
    communication: rating.communication.rate,
    program: rating.programInfo?.name || 'unkown',
    sprint: rating.sprintInfo?.name || 'unkown',
    updatedAt: rating.updatedAt,
    createdAt: rating.createdAt,
  };

  return formatedRating;
};

export default deleteFeedback;
