import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3333",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

// configのタイプ要確認
axiosClient.interceptors.request.use((config: any) => {
  config.headers = {
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFQNEY4M19KR0RNS3YyWlViNDIxSCJ9.eyJpc3MiOiJodHRwczovL2Rldi04cW42MDBiNnVpaTMybXF4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NDAxYTE0MzdhZTFkM2Q0N2MwN2IyNWQiLCJhdWQiOlsiaHR0cHM6Ly9tZWV0aW5nLWFwcC1iYWNrIiwiaHR0cHM6Ly9kZXYtOHFuNjAwYjZ1aWkzMm1xeC51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc4NDI0NDQxLCJleHAiOjE2Nzg1MTA4NDEsImF6cCI6IjFOVzhiY3k1cW9CZWJiOHIyajNzbEY0QkFnaDRQR1ZBIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.ckEPMDGOKaRwzIA7PNPR60BlH9RIxqf9r2cHEZM9bjad0z9UxjpSfpUvZ7vpVrJegp35axSs-MQq4d41SR5wGYlN6CFLuqOo7y4rD6Z6shhFlsp0TJFLTsIqsW6yl3swdqHMeaohBOVQGNveorAw9h0U3co6dOFziCOTXMCpyapfXZwJsH0HpUnmVzyK6DbaFy8MsCag3if3eXamFv2I0u2Z8QSb2E5Bz-GJDr43m7Emfmql9hr-AkYZzuotVWrHzxkSkGJS20OmF_2led2Zo_Nt2BwwraQ4_uEplSyiUmcNcB2oiyFPIWx2ghfpIfhl80uemNr6uY8AXa18SMBzzg",
  };
  return config;
});
