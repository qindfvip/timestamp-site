$(document).ready(function() {
    // Toggle mobile menu
    $('#menu-toggle').click(function() {
        $('#mobile-menu').toggleClass('hidden');
    });
    // Batch convert timestamps to date-time
    $('#convertBatchToDatetime').click(function() {
        const timestamps = $('#batchTimestamps').val();
        if (timestamps) {
            const timestampArray = timestamps.split('\n');
            const datetimeArray = [];
            
            timestampArray.forEach(function(timestamp) {
                if (timestamp.trim() !== '') {
                    const date = new Date(timestamp.trim() * 1000);
                    datetimeArray.push(date.toLocaleString());
                }
            });
            
            $('#batchDatetimes').val(datetimeArray.join('\n'));
        }
    });
    
    // Batch convert date-time to timestamps
    $('#convertBatchToTimestamp').click(function() {
        const datetimes = $('#batchDatetimesInput').val();
        if (datetimes) {
            const datetimeArray = datetimes.split('\n');
            const timestampArray = [];
            
            datetimeArray.forEach(function(datetime) {
                if (datetime.trim() !== '') {
                    const date = new Date(datetime.trim());
                    timestampArray.push(Math.floor(date.getTime() / 1000));
                }
            });
            
            $('#batchTimestampsOutput').val(timestampArray.join('\n'));
        }
    });
    
    $('#convertToDatetime').click(function() {
        const timestamp = $('#timestamp').val();
        if (timestamp) {
            const date = new Date(timestamp * 1000);
            $('#datetime').val(date.toLocaleString());
        }
    });
    
    // Convert date-time to timestamp
    $('#convertToTimestamp').click(function() {
        const datetime = $('#datetimeInput').val();
        if (datetime) {
            const date = new Date(datetime);
            $('#timestampOutput').val(Math.floor(date.getTime() / 1000));
        }
    });
    
    // Get current timestamp
    $('#getCurrentTimestamp').click(function() {
        const now = new Date();
        $('#currentTimestamp').val(Math.floor(now.getTime() / 1000));
    });
    
    // Time difference calculation
    $('#calculateDifference').click(function() {
        const startTime = $('#startTime').val();
        const endTime = $('#endTime').val();
        
        if (startTime && endTime) {
            // Parse start time
            let startTimestamp;
            if (isNaN(startTime)) {
                // Assume it's date-time format
                startTimestamp = new Date(startTime).getTime() / 1000;
            } else {
                // Assume it's Unix timestamp
                startTimestamp = parseFloat(startTime);
            }
            
            // Parse end time
            let endTimestamp;
            if (isNaN(endTime)) {
                // Assume it's date-time format
                endTimestamp = new Date(endTime).getTime() / 1000;
            } else {
                // Assume it's Unix timestamp
                endTimestamp = parseFloat(endTime);
            }
            
            // Calculate time difference
            const difference = Math.abs(endTimestamp - startTimestamp);
            
            // Format time difference
            const days = Math.floor(difference / 86400);
            const hours = Math.floor((difference % 86400) / 3600);
            const minutes = Math.floor((difference % 3600) / 60);
            const seconds = Math.floor(difference % 60);
            
            $('#timeDifference').val(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
        }
    });
    
    // Historical time query
    $('#queryHistoricalTime').click(function() {
        const timestamp = $('#historicalTimestamp').val();
        if (timestamp) {
            const date = new Date(timestamp * 1000);
            $('#historicalDatetime').val(date.toLocaleString());
        }
    });
    
    // Copy functionality
    $('.copy-btn').click(function() {
        const targetId = $(this).data('target');
        const targetElement = $(targetId);
        targetElement.select();
        document.execCommand('copy');
        
        // Show copy success message
        const originalText = $(this).text();
        $(this).text('Copied!');
        setTimeout(() => {
            $(this).text(originalText);
        }, 2000);
    });
});