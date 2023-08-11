const g = 9.81; // Acceleration due to gravity in m/s^2
const concreteSetTimeHours = 2; // Assuming concrete starts setting after 2 hours

let currentHeight = 0; // To keep track of the current height during animation

function calculateAndDraw() {
    // Retrieve input values
    const formworkHeight = parseFloat(document.getElementById("formworkHeight").value) / 100; // Convert to meters
    const concreteHeight = parseFloat(document.getElementById("concreteHeight").value) / 100; // Convert to meters
    const concreteWeight = parseFloat(document.getElementById("concreteWeight").value);
    const formworkResistance = parseFloat(document.getElementById("formworkResistance").value);
    const rateOfRise = parseFloat(document.getElementById("rateOfRise").value) / 100; // Convert to meters/hour

    // Calculate the effective fluid height
    const fillTimeHours = concreteHeight / rateOfRise;
    const fluidTime = fillTimeHours < concreteSetTimeHours ? fillTimeHours : concreteSetTimeHours;
    const effectiveFluidHeight = rateOfRise * fluidTime;

    const pMax = concreteWeight * g * effectiveFluidHeight;

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw formwork
    drawFormwork();

    // Start animation
    currentHeight = 0;
    requestAnimationFrame(() => animatePressure(ctx, concreteHeight, formworkHeight, pMax, formworkResistance, rateOfRise));
}

function drawFormwork() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#aaa";
    ctx.fillRect(50, canvas.height - 400, 100, 400); // Assuming a max canvas height of 400 for visualization
}

function animatePressure(ctx, concreteHeight, formworkHeight, pMax, formworkResistance, rateOfRise) {
    // Increase the currentHeight based on rateOfRise
    currentHeight += rateOfRise / 60; // Divided by 60 for 60 frames per second approximation

    // Calculate current pressure
    const currentPressure = currentHeight * g * rateOfRise;

    // Clear previous triangle/trapezoid
    ctx.clearRect(50, canvas.height - 400, 150, 400);

    // Redraw formwork
    drawFormwork();

    if (currentPressure <= formworkResistance) {
        // Draw regular triangle
        ctx.fillStyle = "rgba(255,0,0,0.5)";
        ctx.beginPath();
        ctx.moveTo(50, canvas.height);
        ctx.lineTo(50, canvas.height - (currentHeight * 200));
        ctx.lineTo(50 + (currentPressure / 10), canvas.height);
        ctx.closePath();
        ctx.fill();
    } else {
        // Draw trapezoid up to resistance and dashed triangle for the rest

    // Calculate where the trapezoid's top will be based on the formwork's resistance
    const trapezoidTop = canvas.height - (formworkResistance / (rateOfRise * g) * 200);
    const trapezoidBaseWidth = formworkResistance / 10;
    
    // Draw trapezoid
    ctx.fillStyle = "rgba(255,0,0,0.5)";
    ctx.beginPath();
    ctx.moveTo(50, canvas.height);
    ctx.lineTo(50, trapezoidTop);
    ctx.lineTo(50 + trapezoidBaseWidth, trapezoidTop);
    ctx.lineTo(50 + (currentPressure / 10), canvas.height);
    ctx.closePath();
    ctx.fill();
    
    // Draw dashed triangle for the rest
    const triangleTop = canvas.height - (currentHeight * 200);
    
    ctx.fillStyle = "rgba(255,100,100,0.3)"; // Lighter fill for the triangle
    ctx.setLineDash([5, 5]); // Set dashed lines
    ctx.beginPath();
    ctx.moveTo(50, trapezoidTop);
    ctx.lineTo(50, triangleTop);
    ctx.lineTo(50 + trapezoidBaseWidth, trapezoidTop);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(255,0,0,0.5)";
    ctx.stroke();
    ctx.setLineDash([]); // Reset line style for other drawings



    }

    if (currentHeight <= concreteHeight) {
        // Continue animation
        requestAnimationFrame(() => animatePressure(ctx, concreteHeight, formworkHeight, pMax, formworkResistance, rateOfRise));
    }
}
