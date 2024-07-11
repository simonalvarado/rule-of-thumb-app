export function calculateVotePercentages(positiveVotes, negativeVotes) {
  const totalVotes = positiveVotes + negativeVotes;
  const positivePercentage =
    totalVotes > 0 ? ((positiveVotes / totalVotes) * 100).toFixed(1) : 0;
  const negativePercentage =
    totalVotes > 0 ? ((negativeVotes / totalVotes) * 100).toFixed(1) : 0;

  return { positivePercentage, negativePercentage };
}
