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
        
        // Calculate property counts for this sequence
        const counts = { T: 0, P: 0, C: 0 };
        sequence.forEach(code => counts[code]++);
        
        // Update max earnings and best sequences
        if (totalEarnings > maxEarnings) {
            maxEarnings = totalEarnings;
            bestSequences = [{...counts}]; // Reset with new best sequence
        } 
        else if (totalEarnings === maxEarnings) {
            // Only keep unique sequences, maximum of 2
            const isUnique = !bestSequences.some(s => 
                s.T === counts.T && s.P === counts.P && s.C === counts.C);
            
            if (isUnique && bestSequences.length < 2) {
                bestSequences.push({...counts});
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
    
    // Start with empty sequence at time 0
    trySequence(0, [], 0);
    
    // Format the output
    let output = `Earnings: $${maxEarnings}\nSolutions\n`;
    
    bestSequences.forEach((seq, index) => {
        output += `${index + 1}. T: ${seq.T} P: ${seq.P} C: ${seq.C}\n`;
    });
    
    
    return output;
}

// Test cases
console.log(calculateMaxProfit(7));  // Example that would match your sample format
console.log(calculateMaxProfit(49)); // Your original test case