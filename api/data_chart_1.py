from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

# Ruta del archivo CSV
csv_path = 'data/GamingStudy_data.csv'

@app.route('/api/analysis', methods=['GET'])
def analyze_playstyle():
    try:
        # Cargar los datos
        data = pd.read_csv(csv_path, encoding='ISO-8859-1')

        # Filtrar columnas relevantes
        relevant_data = data[['Playstyle', 'GAD_T']]

        # Eliminar filas con valores faltantes
        relevant_data = relevant_data.dropna()

        # Agrupar por estilo de juego y calcular la ansiedad promedio
        result = relevant_data.groupby('Playstyle')['GAD_T'].mean().reset_index()
        result = result.rename(columns={'GAD_T': 'Avg_Anxiety'})

        # Convertir a JSON
        response = result.to_dict(orient='records')
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
