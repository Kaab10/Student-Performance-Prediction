# Student Performance Prediction & Analytics Suite

A machine learning system that predicts student performance (numerical score and pass/fail) from attendance, study habits, and prior marks. Built with a Flask backend and the ScholarPulse web UI.

---

## Key Features
* **Multi-Algorithm Model Training:** Compares Linear/Logistic Regression with Random Forest regressors and classifiers.
* **ScholarPulse Web UI:** Responsive prediction form with live validation, result score ring, history filters, and analytics cards.
* **Data Visualization:** Matplotlib charts styled to match the UI, including pass-threshold markers.
* **Persistent Database Logging:** Saves inputs and predictions to SQLite (`students.db`).
* **History & Analytics:** `/history` for searchable past runs and `/analytics` for aggregate pass rate and score stats.

---

## Technology Stack
* **Language:** Python 3
* **Machine Learning:** Scikit-Learn (`StandardScaler` pipeline)
* **Web Framework:** Flask + HTML5 / CSS3 / vanilla JS
* **Data Science:** Pandas, NumPy, Matplotlib
* **Database:** SQLite3

---

## Directory Structure
```text
Student-Performance-Prediction/
├── app.py                 # Flask routes, chart generation
├── database.py            # SQLite schema & helpers
├── model.py               # ML train / predict pipeline
├── students.db            # Persistent SQLite database
├── requirements.txt       # Python dependencies
├── templates/             # Jinja2 pages (base, index, result, history, analytics)
├── static/
│   ├── css/               # Design system and page styles
│   ├── js/                # Nav, form validation, history filters
│   └── charts/            # Generated prediction charts
└── README.md
```

---

## Model & Feature Architecture

### Feature Input Matrix:
1. **Attendance (%):** Percentage of lectures attended.
2. **Study Hours per Day:** Average hours spent studying daily.
3. **Previous Marks (%):** Prior academic performance.

### Preprocessing & Pipeline:
* Inputs are scaled with a fitted **StandardScaler**.
* **Random Forest Regressor** is the default production model for score prediction.
* **Pass/Fail Threshold:** 40%. Predicted score >= 40 is classified as Pass.

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bilalahmed251/Student-Performance-Prediction.git
   cd Student-Performance-Prediction
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Optional — train models / initialize DB from the CLI:**
   ```bash
   python model.py
   python database.py
   ```

4. **Run the Flask application:**
   ```bash
   python app.py
   ```
   Open `http://127.0.0.1:7860` (or the port set by the `PORT` environment variable).

---

## Database Schema (`students.db`)
Predictions are stored in a `predictions` table:
* `id` (Primary Key, Auto-increment)
* `student_name` (Text)
* `attendance` (Float)
* `study_hours` (Float)
* `previous_marks` (Float)
* `predicted_score` (Float)
* `pass_fail` (String — Pass or Fail)
* `timestamp` (DateTime)

---

## Routes
| Path | Purpose |
|------|---------|
| `/` | Prediction form |
| `/predict` | POST handler for new predictions |
| `/history` | Searchable prediction log |
| `/analytics` | Aggregate stats dashboard |
