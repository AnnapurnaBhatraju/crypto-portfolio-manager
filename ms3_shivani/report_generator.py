# report_generator.py

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import csv
import io

router = APIRouter()

@router.get("/api/v1/report")
def generate_csv_report():
    """
    Temporary dummy data.
    Later this data will come from MongoDB + Live API + Risk Logic
    """

    portfolio_data = [
        {
            "coin": "BTC",
            "initial_price": 40000,
            "current_price": 42000,
            "risk": "Stable"
        },
        {
            "coin": "ETH",
            "initial_price": 2500,
            "current_price": 2300,
            "risk": "Danger"
        }
    ]

    output = io.StringIO()
    writer = csv.writer(output)

    # CSV Header
    writer.writerow([
        "Coin Name",
        "Initial Price",
        "Current Price",
        "P&L (%)",
        "Risk Status"
    ])

    # CSV Rows
    for item in portfolio_data:
        pnl = ((item["current_price"] - item["initial_price"]) / item["initial_price"]) * 100

        writer.writerow([
            item["coin"],
            item["initial_price"],
            item["current_price"],
            round(pnl, 2),
            item["risk"]
        ])

    output.seek(0)

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=portfolio_report.csv"}
    )
