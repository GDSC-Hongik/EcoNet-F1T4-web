import { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import EcoNewsList from "../components/EcoNewsList";
import EcoPartyList from "../components/EcoPartyList";
import LoadingSpinner from "../components/LoadingSpinner";
import { api } from "../api";

const EcoNewsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EcoNewsListContainer = styled.div`
  display: flex;
  position: relative;
  bottom: 40px;
  gap: 64px;
  justify-content: space-around;
`;

const Header = styled.h1`
  font-size: 28px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  width: 560px;
  height: 360px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #000000;
`;

export default function EcoNewsPage() {
  const [searchText, setSearchText] = useState("");
  const [domesticNews, setDomesticNews] = useState([]);
  const [worldNews, setWorldNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [domesticPage, setDomesticPage] = useState(1);
  const [worldPage, setWorldPage] = useState(1);
  const [hasMoreDomestic, setHasMoreDomestic] = useState(true);
  const [hasMoreWorld, setHasMoreWorld] = useState(true);

  const handleSearch = (inputText) => {
    setSearchText(inputText);
  };

  const fetchDomesticNews = async () => {
    try {
      const response = await api.get("/articles", {
        params: {
          page: domesticPage,
          limit: 10,
        },
      });
      const { hkbs_articles } = response.data;

      setDomesticNews((prevNews) => [...prevNews, ...hkbs_articles.data]);
      setDomesticPage((prevPage) => prevPage + 1);
      if (hkbs_articles.data.length < 10) {
        setHasMoreDomestic(false); // 더 이상 불러올 뉴스가 없으면 false 설정
      }
    } catch (error) {
      console.error("Failed to fetch domestic news.", error);
    }
  };

  const fetchWorldNews = async () => {
    try {
      const response = await api.get("/articles", {
        params: {
          page: worldPage,
          limit: 10,
        },
      });
      const { bbc_articles } = response.data;

      setWorldNews((prevNews) => [...prevNews, ...bbc_articles.data]);
      setWorldPage((prevPage) => prevPage + 1);
      if (bbc_articles.data.length < 10) {
        setHasMoreWorld(false); // 더 이상 불러올 뉴스가 없으면 false 설정
      }
    } catch (error) {
      console.error("Failed to fetch world news.", error);
    }
  };

  useEffect(() => {
    const fetchInitialNews = async () => {
      setLoading(true);
      await Promise.all([fetchDomesticNews(), fetchWorldNews()]);
      setLoading(false);
    };
    fetchInitialNews();
  }, []);

  useEffect(() => {
    if (searchText === "") return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await api.get("/articles/search", {
          params: {
            query: searchText,
          },
        });
        const { bbc_articles, hkbs_articles } = response.data;

        setDomesticNews(hkbs_articles.data);
        setWorldNews(bbc_articles.data);
        setDomesticPage(2); // 검색 후 페이지를 초기화하고 2로 설정
        setWorldPage(2);
        setHasMoreDomestic(hkbs_articles.data.length === 10);
        setHasMoreWorld(bbc_articles.data.length === 10);
      } catch (error) {
        console.error("Failed to fetch search results.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchText]);

  return (
    <EcoNewsPageContainer>
      <SearchBar onSearch={handleSearch}></SearchBar>
      <EcoNewsListContainer>
        <Container>
          <Header>국내 뉴스</Header>
          {loading ? (
            <LoadingContainer>
              <LoadingSpinner />
            </LoadingContainer>
          ) : (
            <EcoNewsList
              news={domesticNews}
              fetchMoreNews={fetchDomesticNews}
              hasMore={hasMoreDomestic}
            />
          )}
        </Container>
        <Container>
          <Header>국제 뉴스</Header>
          {loading ? (
            <LoadingContainer>
              <LoadingSpinner />
            </LoadingContainer>
          ) : (
            <EcoNewsList
              news={worldNews}
              fetchMoreNews={fetchWorldNews}
              hasMore={hasMoreWorld}
            />
          )}
        </Container>
      </EcoNewsListContainer>
      <EcoPartyList />
    </EcoNewsPageContainer>
  );
}
