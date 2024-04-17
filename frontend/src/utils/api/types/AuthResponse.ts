interface UserResponse {
  uuid: string;
  email: string;
  name: string;
  image: string;
  latestLogin: string;
  deletedAt: string;
  accessToken: string;
}

interface Cat {
  id: string;
  url: string;
}

interface ProfileResponse extends UserResponse {
  favorites: {
    userId: string;
    cat: Cat;
  }[];
}

interface LoginHistoryResponse {
  dateTime: string;
}
