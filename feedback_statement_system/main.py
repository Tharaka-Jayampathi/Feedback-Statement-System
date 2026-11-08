from fastapi import FastAPI
from pydantic import BaseModel
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# NLTK lexicon download කරගැනීම
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

app = FastAPI(title="AI Sentiment Analysis Service")

class AnalyzeRequest(BaseModel):
    text: str

class AnalyzeResponse(BaseModel):
    sentiment: str
    compound_score: float

@app.post("/analyze", response_model=AnalyzeResponse)
def analyze_sentiment(payload: AnalyzeRequest):
    scores = sia.polarity_scores(payload.text)
    compound = scores['compound']

    if compound >= 0.05:
        sentiment = "POSITIVE"
    elif compound <= -0.05:
        sentiment = "NEGATIVE"
    else:
        sentiment = "NEUTRAL"

    return AnalyzeResponse(sentiment=sentiment, compound_score=compound)