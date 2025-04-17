function calculateMaxProfit(time) {
    const properties = [
        { code: 'T', buildTime: 5, earningsPerTime: 1500 },
        { code: 'P', buildTime: 4, earningsPerTime: 1000 },
        { code: 'C', buildTime: 10, earningsPerTime: 3000 }
    ];
    
    let maxEarnings = 0;
    let bestSequences = [];
    
    function trySequence(currentTime, sequence, totalEarnings) {
        if (currentTime > time) return;
        
        // Update max earnings and sequences if current sequence is better
        if (totalEarnings > maxEarnings) {
            maxEarnings = totalEarnings;
            bestSequences = [{...countProperties(sequence)}];
        } else if (totalEarnings === maxEarnings && maxEarnings > 0) {
            const newSequence = countProperties(sequence);
            // Check if this sequence is already recorded
            if (!bestSequences.some(s => 
                s.T === newSequence.T && 
                s.P === newSequence.P && 
                s.C === newSequence.C)) {
                bestSequences.push(newSequence);
            }
        }
        
        // Try building each property next
        for (const prop of properties) {
            const completionTime = currentTime + prop.buildTime;
            if (completionTime > time) continue;
            const operationalTime = time - completionTime;
            const newEarnings = totalEarnings + (prop.earningsPerTime * operationalTime);
            trySequence(
                completionTime,
                [...sequence, prop.code],
                newEarnings
            );
        }
    }
    
    // Helper function to count properties in a sequence
    function countProperties(sequence) {
        const counts = { T: 0, P: 0, C: 0 };
        sequence.forEach(code => counts[code]++);
        return counts;
    }
    
    // Start with empty sequence at time 0
    trySequence(0, [], 0);
    
    // Format the output as requested
    let output = `Earnings: $${maxEarnings}\n`;
    output += `Solutions\n`;
    const topTwoSequences = bestSequences.slice(0, 2);
    
    topTwoSequences.forEach((seq, index) => {
        output += `${index + 1}. T: ${seq.T} P: ${seq.P} C: ${seq.C}\n`;
    });
    
    
    return output;
}

// Test cases
console.log(calculateMaxProfit(7));  // Example that would match your sample format
console.log(calculateMaxProfit(49)); // Your original test case