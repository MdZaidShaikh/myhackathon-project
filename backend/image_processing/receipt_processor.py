from langchain.prompts import ChatPromptTemplate, FewShotChatMessagePromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field
from typing import List
import json

class ItemInfo(BaseModel):
    name: str = Field(..., description="Name of the item")
    unit: float = Field(..., description="Quantity of the item")
    price: float = Field(..., description="Price per unit of the item")
    amount: float = Field(..., description="Total amount for the item")

class ReceiptInfo(BaseModel):
    store: str = Field(..., description="Store name")
    address: str = Field(..., description="Address of the store")
    city: str = Field(..., description="City where the store is located")
    phone: str = Field(..., description="Phone number of the store")
    receipt_no: str = Field(..., description="Receipt number")
    date: str = Field(..., description="Date of the receipt in DD/MM/YYYY format")
    time: str = Field(..., description="Time of the transaction")
    items: List[ItemInfo] = Field(..., description="List of items purchased")
    total: float = Field(..., description="Total amount of the receipt")
    number_items: int = Field(..., description="Number of items in the receipt")
    payment_method: str = Field(..., description="Payment method used")

def get_model(api_key):
    model = ChatOpenAI(model="gpt-3.5-turbo-0125", api_key=api_key)
    structured_llm = model.with_structured_output(ReceiptInfo)
    return structured_llm

def structured_output(texts, api_key):
    """
    Process extracted text and structure it into a list of receipt objects (dictionaries).

    Args:
        texts (list): List of extracted text from receipts.
        api_key (str): OpenAI API key.

    Returns:
        list: List of structured receipt objects.
    """
    # Define examples and prompts (same as in your original code)
    examples_cat = [
        {"input": "example_text_1", "output": "example_output_1"},
        {"input": "example_text_2", "output": "example_output_2"},
    ]

    example_prompt = ChatPromptTemplate.from_messages([
        ("human", "{input}"),
        ("ai", "{output}"),
    ])

    few_shot_prompt_cat = FewShotChatMessagePromptTemplate(
        example_prompt=example_prompt,
        examples=examples_cat,
    )

    system_message_cat = (
        "You are POS receipt data expert, parse, detect, recognize and convert the receipt OCR image result "
        "into a structured receipt data object. Next, assign a category to each item. Don't make up any value not "
        "in the Input. Output must be a well-formed JSON object."
    )

    final_prompt_cat = ChatPromptTemplate.from_messages([
        ("system", "{system_message}"),
        few_shot_prompt_cat,
        ("human", "{input}"),
    ])

    # Initialize the model
    structured_llm = get_model(api_key)
    chain = final_prompt_cat | structured_llm

    # Process each text and collect the output objects
    structured_receipts = []
    for text in texts:
        output = chain.invoke({"system_message": system_message_cat, "input": text})
        if isinstance(output, str):
            try:
                output = json.loads(output)
            except json.JSONDecodeError as e:
                print("Error parsing JSON output:", e)
        structured_receipts.append(output)

    return structured_receipts