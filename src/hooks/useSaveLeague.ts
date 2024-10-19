import { CreateLeagueData } from "@/backend/modules/league/application/league.uc";
import { CreateLeagueDto } from "@/backend/modules/league/infrastructure/dtos/create-league.dto";
import { API } from "@/common/constants/api-enum";
import { ServerResponse } from "@/common/interfaces/server-response";
import { useState } from "react";

type R = ServerResponse<CreateLeagueData>;
const fetcher = (name: string) =>
  fetch(API.LEAGUE, {
    method: "POST",
    body: JSON.stringify({ name } as CreateLeagueDto),
  });
/**
 * State only changes when the handler is called.
 * @param params onSuccess prop only run in the handler function, expected to be used in client events.
 * @returns
 */
const useSaveLeague = () => {
  const [data, setData] = useState<R>();
  const [error, setError] = useState<Omit<R, "data">>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSaveLeague = async (data: CreateLeagueDto) => {
    try {
      setLoading((prevState) => !prevState);
      const response: R = await fetcher(data.name).then(async (res) => await res.json());
      console.log("🚀 ~ handleSaveLeague ~ response:", response);
      if (response?.data && response?.message) setData(response);
      else if (response?.message) setError({ message: response.message });
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      setLoading((prevState) => !prevState);
    }
  };

  return {
    clearError: () => setError(undefined),
    data,
    error,
    handleSaveLeague,
    loading,
  };
};

export { useSaveLeague };
