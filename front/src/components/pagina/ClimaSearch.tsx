import { SetStateAction, useState } from "react";
import styled from "styled-components";

const cities = [
  "Aguanil",
  "Alfenas",
  "Alpinópolis",
  "Alterosa",
  "Areado",
  "Boa_Esperança",
  "Cabo_Verde",
  "Camacho",
  "Campo_Belo",
  "Campo_do_Meio",
  "Campos_Gerais",
  "Cana_Verde",
  "Candeias",
  "Capitólio",
  "Carmo_do_Rio_Claro",
  "Conceição_da_Aparecida",
  "Coqueiral",
  "Cristais",
  "Divisa_Nova",
  "Elói_Mendes",
  "Fama",
  "Formiga",
  "Guapé",
  "Ilicínea",
  "Itaú_de_Minas",
  "Juruaia",
  "Lavras",
  "Luminárias",
  "Machado",
  "Mato_Verde",
  "Nova_Resende",
  "Passos",
  "São_João_Batista_do_Glória",
  "São_José_da_Barra",
];

export default function ClimaSearch() {
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedCity(e.target.value);
  };

  const handleSearch = () => {
    const city = searchQuery || selectedCity;
    if (city) {
      // Lógica para buscar o clima da cidade (API ou mock)
      console.log("Buscar clima para:", city);
    }
  };

  return (
    <SearchContainer>
      <SearchGroup>
        <label htmlFor="city">Cidade:</label>
        <SelectField
          id="city"
          value={selectedCity}
          onChange={handleSelectChange}
        >
          <option value="">Selecione sua cidade</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city.replaceAll("_", " ")}
            </option>
          ))}
        </SelectField>
      </SearchGroup>
      <SearchGroup>
        <label htmlFor="search">Pesquisar:</label>
        <SearchInput
          type="text"
          id="search"
          placeholder="Digite o nome da cidade"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Buscar</SearchButton>
      </SearchGroup>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const SearchGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  label {
    font-weight: 600;
    min-width: 80px;
  }
`;

const SelectField = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  min-width: 200px;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  flex: 1;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background: #0e0e1a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
