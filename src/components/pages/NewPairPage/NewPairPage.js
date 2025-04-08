
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { useParams, useNavigate, useSearchParams } from "react-router-dom";
  import Spinner from "react-bootstrap/Spinner";
  import ModalFilter from "../../ModalFilter/ModalFilter";
  import filterMapping from "../../ModalFilter/FilterMapping";
  import CoinTable from "../../CoinTable/CoinTable";
  import SortingControls from "../../SortingControls/SortingControls";
  import AdsBanner from "../../AdsBanner/AdsBanner";
  import PaginationControls from "../../PaginationControls/PaginationControls";
  
  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  
  const PER_PAGE = 20;
  const CACHE_KEY = "crypto_market_data";
  const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 часа
  
  const MainPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { page: urlPage } = useParams();
    const currentPage = Number(urlPage) || 1;
    const initialSortOrder = searchParams.get("sort") || null;
    const initialTimeframe = searchParams.get("timeframe") || "24h";
    const initialFilter = {};
    searchParams.forEach((value, key) => {
      if (filterMapping[key]) {
        initialFilter[key] = value;
      }
    });
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState(initialSortOrder);
    const [timeframe, setTimeframe] = useState(initialTimeframe);
  
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filter, setFilter] = useState({});
  
    useEffect(() => {
      setIsLoading(true);
  
      const loadCachedData = () => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { timestamp, data } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_TTL) {
            return data;
          }
        }
        return null;
      };
  
      const fetchData = async () => {
        if (filter && Object.keys(filter).length > 0) {
          localStorage.removeItem(CACHE_KEY);
        }
  
        const cachedData = loadCachedData();
  
        if (cachedData) {
          console.log("Данные загружены из кэша");
          processAndSetData(cachedData);
          setIsLoading(false);
          return;
        }
  
        try {
          console.log("Загружаем данные с API...");
          const params = {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 250,
            page: 1,
            x_cg_demo_api_key: API_KEY,
            price_change_percentage: timeframe,
          };
  
          if (filter && Object.keys(filter).length > 0) {
            console.log("📌 Активные фильтры:", filter);
            Object.keys(filter).forEach((key) => {
              const apiParam = filterMapping[key]; 
              const value = filter[key]; 
  
              console.log(
                `Проверяем фильтр: ${key} → API: ${apiParam}, Значение: ${value}`
              );
  
              if (
                apiParam &&
                value !== undefined &&
                value !== null &&
                value !== ""
              ) {
                params[apiParam] = value;
                console.log(`Добавляем в параметры: ${apiParam} = ${value}`);
              } else {
                console.log(`${key} empty or invalid`);
              }
            });
          }
          console.log("Отправляем запрос с параметрами:", params);
  
          const response = await axios.get(`${API_URL}/coins/markets`, {
            params,
          });
  
          if (Array.isArray(response.data)) {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ timestamp: Date.now(), data: response.data })
            );
            console.log("Данные сохранены в кэш");
            processAndSetData(response.data);
          } else {
            console.error("Ошибка: API вернуло некорректные данные");
            setCoins([]);
          }
        } catch (error) {
          console.error(
            "error",
            error.response ? error.response.data : error.message
          );
          setCoins([]);
        } finally {
          setIsLoading(false);
        }
      };
  
      const processAndSetData = (data) => {
        let filteredData = [...data];
  
        if (sortOrder === "gainers") {
          filteredData.sort(
            (a, b) =>
              b.price_change_percentage_24h - a.price_change_percentage_24h
          );
        } else if (sortOrder === "losers") {
          filteredData.sort(
            (a, b) =>
              a.price_change_percentage_24h - b.price_change_percentage_24h
          );
        }
  
        const paginatedData = filteredData.slice(
          (currentPage - 1) * PER_PAGE,
          currentPage * PER_PAGE
        );
        setCoins(paginatedData);
      };
  
      fetchData();
    }, [currentPage, sortOrder, timeframe, filter]); // Запрос заново при изменении фильтров
  
    const applyFilters = (newFilters) => {
      setFilter(newFilters);
      updateQueryParams(sortOrder, timeframe, newFilters);
    };
  
    const updateQueryParams = (newSortOrder, newTimeframe, newFilter = {}) => {
      const params = new URLSearchParams(searchParams);
      if (newSortOrder) {
        params.set("sort", newSortOrder);
      } else {
        params.delete("sort");
      }
      if (newTimeframe) params.set("timeframe", newTimeframe);
      Object.keys(newFilter).forEach((key) => {
        if (newFilter[key]) {
          params.set(key, newFilter[key]);
        }
      });
      setSearchParams(params);
    };
  
    const handleSortChange = (newSortOrder) => {
      setSortOrder(newSortOrder);
      updateQueryParams(newSortOrder, timeframe);
    };
  
    const handleTimeframeChange = (newTimeframe) => {
      setTimeframe(newTimeframe);
      updateQueryParams(sortOrder, newTimeframe);
    };
  
    const goToPage = (pageNumber) => {
      const params = searchParams.toString();
      navigate(`/new-pairs/${pageNumber}${params ? `?${params}` : ""}`); 
    };
  
    return (
      <div className="category-container">
        {isLoading ? (
          <Spinner className="spinner" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <AdsBanner />
            <SortingControls
              sortOrder={sortOrder}
              handleSortChange={handleSortChange}
              handleTimeframeChange={handleTimeframeChange}
              timeframe={timeframe}
              setShowFilterModal={setShowFilterModal}
            />
            <CoinTable
              coins={coins}
              currentPage={currentPage}
              perPage={PER_PAGE}
            />
            <PaginationControls goToPage={goToPage} currentPage={currentPage} />
            <ModalFilter
              show={showFilterModal}
              handleClose={() => setShowFilterModal(false)}
              applyFilters={applyFilters}
            />
          </>
        )}
      </div>
    );
  };
  
  export default MainPage;
  