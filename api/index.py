from flask import Flask, jsonify, send_file
from data_utils import process_csv
from data_utils import create_plot
from flask_cors import CORS
import os
import pandas as pd



app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas
csv_path = os.path.join(os.path.dirname(__file__), '../data/GamingStudy_data.csv')

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/api/data', methods=['GET'])
def get_data():
    file_path = os.path.join(os.path.dirname(__file__), '../data/GamingStudy_data.csv')
    data = process_csv(file_path)
    return jsonify(data)

@app.route('/api/plot', methods=['GET'])
def get_plot():
    # Generar el gráfico como cadena base64
    plot_data = create_plot()
    # Enviar la imagen al cliente en formato base64
    return jsonify({
        "image": plot_data,
        "message": "Ay, lmao!"
        })

@app.route('/api/analysis', methods=['GET'])
def analyze_playstyle():
    try:
        # Cargar los datos
        data = pd.read_csv(csv_path, encoding='ISO-8859-1')

        # Filtrar columnas relevantes
        relevant_data = data[['Playstyle', 'GAD_T']].dropna()

        # Clasificar estilos de juego con reglas robustas
        def categorize_playstyle_robust(playstyle):
            playstyle = playstyle.strip().lower()
            if "singleplayer" in playstyle:
                return "Singleplayer"
            elif any(keyword in playstyle for keyword in ["real life friends", "acquaintances", "teammates", "friends"]):
                return "With Friends"
            elif "strangers" in playstyle:
                return "With Strangers"
            else:
                return "With Strangers"

        relevant_data['Playstyle'] = data['Playstyle'].apply(categorize_playstyle_robust)

        # Calcular la media y la mediana por grupo
        result = relevant_data.groupby('Playstyle')['GAD_T'].agg(['mean', 'median']).reset_index()
        result.rename(columns={'mean': 'Average_Anxiety', 'median': 'Median_Anxiety'}, inplace=True)

        # Convertir a JSON
        response = result.to_dict(orient='records')
        return jsonify(response)

    except FileNotFoundError:
        return jsonify({"error": "CSV file not found"}), 404
    except KeyError as e:
        return jsonify({"error": f"Missing column in CSV: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/gender_analysis', methods=['GET'])
def gender_analysis():
    try:
        # Cargar datos
        data = pd.read_csv(csv_path, encoding='ISO-8859-1')

        # Filtrar columnas necesarias
        relevant_data = data[['Gender', 'GAD_T']]

        # Eliminar filas con valores faltantes
        relevant_data = relevant_data.dropna()

        # Normalizar valores de género para evitar inconsistencias (p. ej., mayúsculas/minúsculas)
        relevant_data['Gender'] = relevant_data['Gender'].str.strip().str.lower()

        # Agrupar por género y calcular media y mediana
        result = relevant_data.groupby('Gender')['GAD_T'].agg(
            Median_Anxiety='median',
            Average_Anxiety='mean'
        ).reset_index()

        # Convertir los resultados a JSON
        response = result.to_dict(orient='records')
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/demographic_analysis', methods=['GET'])
def demographic_analysis():
    try:
        # Leer el CSV
        data = pd.read_csv(csv_path, encoding='ISO-8859-1')

        # Filtrar columnas necesarias
        relevant_data = data[['Residence', 'GAD_T']]

        # Eliminar filas con valores faltantes
        relevant_data = relevant_data.dropna()

        # Definir regiones manualmente
        asia = [
            "South Korea", "Japan", "Malaysia", "Turkey", "India", "China", "Thailand", "Indonesia", "Vietnam", "Philippines"
        ]
        europe = [
            "Germany", "Finland", "UK", "Bosnia and Herzegovina", "Ireland", "Romania", "Sweden",
            "Greece", "Belgium", "Latvia", "Austria", "Croatia", "Spain", "France", "Italy", "Netherlands", "Norway", "Poland"
        ]
        americas = [
            "USA", "Canada", "Brazil", "Mexico", "Argentina", "Chile", "Colombia", "Peru", "Venezuela"
        ]

        # Función para mapear países a regiones
        def map_to_region(country):
            if country in asia:
                return 'Asia'
            elif country in europe:
                return 'Europe'
            elif country in americas:
                return 'Americas'
            else:
                return 'Other'

        # Aplicar la categoría de regiones
        relevant_data['Region'] = relevant_data['Residence'].apply(map_to_region)

        # Agrupar por región y calcular la media
        result = relevant_data.groupby('Region')['GAD_T'].mean().reset_index()
        result.rename(columns={'GAD_T': 'Average_Anxiety'}, inplace=True)

        # Convertir resultados a JSON
        response = result.to_dict(orient='records')
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/player_count_by_region', methods=['GET'])
def player_count_by_region():
    try:
        # Leer el CSV
        data = pd.read_csv(csv_path, encoding='ISO-8859-1')

        # Definir regiones manualmente
        asia = [
            "South Korea", "Japan", "Malaysia", "Turkey", "India", "China", "Thailand", "Indonesia", "Vietnam", "Philippines"
        ]
        europe = [
            "Germany", "Finland", "UK", "Bosnia and Herzegovina", "Ireland", "Romania", "Sweden",
            "Greece", "Belgium", "Latvia", "Austria", "Croatia", "Spain", "France", "Italy", "Netherlands", "Norway", "Poland"
        ]
        americas = [
            "USA", "Canada", "Brazil", "Mexico", "Argentina", "Chile", "Colombia", "Peru", "Venezuela"
        ]

        # Función para mapear países a regiones
        def map_to_region(country):
            if country in asia:
                return 'Asia'
            elif country in europe:
                return 'Europe'
            elif country in americas:
                return 'Americas'
            else:
                return 'Other'

        # Aplicar la categoría de regiones
        if 'Residence' in data.columns:
            data['Region'] = data['Residence'].apply(map_to_region)

        # Contar jugadores por región
        region_counts = data['Region'].value_counts().reset_index()
        region_counts.columns = ['Region', 'Player_Count']

        # Convertir a JSON
        response = region_counts.to_dict(orient='records')
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/bubble_chart_data', methods=['GET'])
def bubble_chart_data():
    try:
        # Leer el CSV
        data = pd.read_csv(csv_path, encoding='ISO-8859-1')

        # Verificar que las columnas necesarias existan
        if 'Residence' not in data.columns or 'GAD_T' not in data.columns:
            return jsonify({"error": "Missing required columns in the dataset."}), 400

        # Eliminar filas con valores faltantes
        data = data[['Residence', 'GAD_T']].dropna()

        # Calcular datos para el bubble chart por país
        bubble_data = data.groupby('Residence').agg(
            Average_Anxiety=('GAD_T', 'mean'),
            Player_Count=('Residence', 'size')
        ).reset_index()

        # Añadir tamaño proporcional para las burbujas
        bubble_data['Bubble_Size'] = bubble_data['Player_Count']

        # Convertir a JSON
        response = bubble_data.to_dict(orient='records')
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/bubble_chart_age', methods=['GET'])
def bubble_chart_age():
    try:
        # Leer el CSV
        data = pd.read_csv(csv_path, encoding='ISO-8859-1')

        # Verificar que las columnas necesarias existan
        if 'Age' not in data.columns or 'GAD_T' not in data.columns:
            return jsonify({"error": "Missing required columns in the dataset."}), 400

        # Eliminar filas con valores faltantes
        data = data[['Age', 'GAD_T']].dropna()

        # Calcular datos para el bubble chart por edad individual
        bubble_data = data.groupby('Age').agg(
            Average_Anxiety=('GAD_T', 'mean'),
            Player_Count=('Age', 'size')
        ).reset_index()

        # Convertir valores NaN a 0 solo en columnas numéricas
        bubble_data['Average_Anxiety'] = bubble_data['Average_Anxiety'].fillna(0)
        bubble_data['Player_Count'] = bubble_data['Player_Count'].fillna(0)
        bubble_data['Bubble_Size'] = bubble_data['Player_Count']

        # Convertir a JSON
        response = bubble_data.to_dict(orient='records')
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/top_5_anxiety_games', methods=['GET'])
def top_5_anxiety_games():
    try:
        # Leer el CSV
        data = pd.read_csv(csv_path, encoding='ISO-8859-1')

        # Verificar que las columnas necesarias existan
        if 'Game' not in data.columns or 'GAD_T' not in data.columns:
            return jsonify({"error": "Missing required columns in the dataset."}), 400

        # Eliminar filas con valores faltantes
        data = data[['Game', 'GAD_T']].dropna()

        # Calcular la ansiedad promedio por juego
        game_anxiety = data.groupby('Game').agg(
            Average_Anxiety=('GAD_T', 'mean'),
            Player_Count=('Game', 'size')
        ).reset_index()

        # Ordenar por ansiedad promedio y obtener los 5 principales
        top_5_games = game_anxiety.sort_values(by='Average_Anxiety', ascending=False).head(5)

        # Convertir a JSON
        response = top_5_games.to_dict(orient='records')
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/league_anxiety_distribution', methods=['GET'])
def league_anxiety_distribution():
    try:
        # Leer el CSV
        data = pd.read_csv(csv_path, encoding='ISO-8859-1')

        # Verificar que las columnas necesarias existan
        if 'Game' not in data.columns or 'GAD_T' not in data.columns:
            return jsonify({"error": "Missing required columns in the dataset."}), 400

        # Filtrar los datos para League of Legends
        lol_data = data[data['Game'] == 'League of Legends']

        # Eliminar filas con valores faltantes en GAD_T
        lol_data = lol_data[['GAD_T']].dropna()

        # Calcular la distribución (frecuencia de GAD_T)
        distribution = lol_data['GAD_T'].value_counts().sort_index().reset_index()
        distribution.columns = ['GAD_T', 'Count']

        # Convertir a JSON
        response = distribution.to_dict(orient='records')
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/gaming_vs_anxiety', methods=['GET'])
def gaming_vs_anxiety():
    try:
        # Cargar el CSV
        data = pd.read_csv(csv_path, encoding='ISO-8859-1')

        # Verificar que las columnas necesarias existan
        if 'Hours' not in data.columns or 'GAD_T' not in data.columns:
            return jsonify({"error": "Missing required columns in the dataset."}), 400

        # Filtrar columnas relevantes
        relevant_data = data[['Hours', 'GAD_T']].dropna()

        # Limitar las horas de juego a un rango razonable (por ejemplo, 0 a 112 horas por semana)
        relevant_data = relevant_data[(relevant_data['Hours'] >= 0) & (relevant_data['Hours'] <= 112)]

        # Convertir a JSON
        response = relevant_data.to_dict(orient='records')
        return jsonify(response)

    except FileNotFoundError:
        return jsonify({"error": "CSV file not found"}), 404
    except KeyError as e:
        return jsonify({"error": f"Missing column in CSV: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
