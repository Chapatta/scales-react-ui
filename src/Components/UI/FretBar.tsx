const FretBar = () => {
    const fretDivs = []; // Array to hold the div elements

    // Create div elements for each number from 1 to 18
    for (let i = 1; i <= 18; i++) {
      fretDivs.push(<div className="position" key={i}>{i}</div>); // Use a unique 'key' for each element
    }
  
    return (
      <div className="ViolinNeck">
        {fretDivs} {/* Render the array of divs */}
      </div>
    );
}

export default FretBar;