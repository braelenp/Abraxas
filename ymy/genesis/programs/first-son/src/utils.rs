use anchor_lang::prelude::*;
use crate::errors::FirstSonError;

pub fn checked_add(a: u64, b: u64) -> Result<u64> {
    a.checked_add(b).ok_or(FirstSonError::ArithmeticOverflow.into())
}

pub fn checked_sub(a: u64, b: u64) -> Result<u64> {
    a.checked_sub(b).ok_or(FirstSonError::ArithmeticUnderflow.into())
}
