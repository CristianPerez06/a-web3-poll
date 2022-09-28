export interface Vote {
  addr: string;
  value: boolean;
}

export interface GetVotesAbiRes {
  "0": string[];
  "1": boolean[];
}

export const convertToVotes = (res: GetVotesAbiRes) => {
  const { "0": addrArr, "1": valuesArr } = res;
  const votesArr: Vote[] = addrArr.map((addr, index) => {
    return {
      addr: addr,
      value: valuesArr[index],
    };
  });
  return votesArr;
};
