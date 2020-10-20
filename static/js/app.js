function populateCharts(name){
    d3.json("samples.json").then(function(data){
        var samples = data.samples
        var metadata = data.metadata
        var filteredSamples = samples.filter(sample => sample.id == name)[0]
        var filteredMetadata = metadata.filter(sample => sample.id == name)[0]
        
        var trace1 = {
            x: filteredSamples.sample_values.slice(0,10).reverse(),
            y: filteredSamples.otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
            text: filteredSamples.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
          };
          
          // data
          var data = [trace1];
          
          // Apply the group bar mode to the layout
          var layout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 100
            }
          };
          
          // Render the plot to the div tag with id "plot"
          Plotly.newPlot("bar", data, layout);
          
          var trace2 = {
            x: filteredSamples.otu_ids,
            y: filteredSamples.sample_values,
            text: filteredSamples.otu_labels,
            mode: 'markers',
            marker: {
            color: filteredSamples.otu_ids,
            size: filteredSamples.sample_values
            }
          };
          
          var data2 = [trace2];
          
          var layout2 = {
            title: 'Bacteria Cultures per Sample',
            showlegend: false,
            xaxis: {
                title: "OTU ID"
            }
          };
          
          Plotly.newPlot('bubble', data2, layout2);

          var demographics = d3.select("#sample-metadata");
          demographics.html("")
          Object.entries(filteredMetadata).forEach(([key, value])=>{
              demographics.append("p").text(`${key}: ${value}`)
          })
    })
}

d3.json("samples.json").then(function(data){

    var dropdown = d3.select("#selDataset");
    var names = data.names

    names.forEach((name)=> {
        dropdown.append("option").text(name)
    })
    populateCharts(names[0])
})

function optionChanged(value){
    populateCharts(value)

}
