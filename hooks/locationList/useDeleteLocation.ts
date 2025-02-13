const useDeleteLocation = (contentId: number) => {
  const handleDeleteLocation = async () => {
    const params = new URLSearchParams();
    params.append('contentId', contentId.toString());

    const response = await fetch(`/api/content?${params}`, {
      method: 'DELETE',
    });

    if (!response.ok) return;
  };

  return {
    handleDeleteLocation,
  };
};

export default useDeleteLocation;
