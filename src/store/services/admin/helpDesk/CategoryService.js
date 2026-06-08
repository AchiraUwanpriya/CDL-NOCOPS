import axios from 'axios';

const PostNewCategory = (data) => {
  return axios.post('Admin/HelpDesk/PostNewCategory', data).then((response) => {
    return response.data;
  });
};
const GetHelpDeskCategories = (data) => {
  return axios.get(`Admin/HelpDesk/GetHelpDeskCategories`, data).then((response) => {
    return response.data;
  });
};
const UpdateCategory = (data) => {
  return axios.post(`Admin/HelpDesk/UpdateCategory`, data).then((response) => {
    return response.data;
  });
};
const DeleteCategory = (data) => {
  return axios.post(`Admin/HelpDesk/DeleteCategory?id=${data}`).then((response) => {
    return response.data;
  });
};

const categoryService = {
  PostNewCategory,
   GetHelpDeskCategories,
   UpdateCategory,
   DeleteCategory,
};

export default categoryService;
